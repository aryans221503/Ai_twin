import os
import operator
from dotenv import load_dotenv
from typing import TypedDict, Annotated, Sequence, Literal

# --- LLM CLIENTS ---
from langchain_groq import ChatGroq
from langchain_community.chat_models import ChatOllama

# --- LANGGRAPH IMPORTS ---
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolNode
from langchain_core.messages import (
    HumanMessage,
    SystemMessage,
    AIMessage,
    BaseMessage,
)

# --- LOCAL IMPORTS ---
from app.core.tools import get_all_tools

load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")


# =========================
# 1. STATE DEFINITION
# =========================
class AgentState(TypedDict):
    messages: Annotated[Sequence[BaseMessage], operator.add]
    model_type: Literal["general", "local"]
    adapter_name: str | None


# =========================
# 2. LLM FACTORY
# =========================
def get_llm(model_type: str = "general", adapter_name: str | None = None):
    """
    Factory function to return the correct LLM.
    Includes safe fallbacks to prevent crashes.
    """

    # 🚀 FAST CLOUD MODEL
    if model_type == "general":
        if not GROQ_API_KEY:
            raise RuntimeError("GROQ_API_KEY missing")

        return ChatGroq(
            temperature=0,
            model_name="llama-3.1-8b-instant",
            groq_api_key=GROQ_API_KEY,
        )

    # 🧠 LOCAL MODEL (Ollama)
    elif model_type == "local":
        model_to_use = adapter_name if adapter_name else "llama3"
        print(f"🧠 Switching to Local Brain: {model_to_use}")

        try:
            return ChatOllama(
                model=model_to_use,
                temperature=0.3,
            )
        except Exception as e:
            print(f"⚠️ Local model failed: {e}")
            print("🔁 Falling back to cloud model")

            return ChatGroq(
                temperature=0,
                model_name="llama-3.1-70b-versatile",
                groq_api_key=GROQ_API_KEY,
            )

    # Fallback
    return ChatGroq(
        temperature=0,
        model_name="llama-3.1-70b-versatile",
        groq_api_key=GROQ_API_KEY,
    )


# =========================
# 3. AGENT NODE
# =========================
def call_model(state: AgentState):
    """
    Core reasoning node.
    Handles tool binding safely for both Groq and Ollama.
    """
    messages = state["messages"]
    model_type = state.get("model_type", "general")
    adapter_name = state.get("adapter_name", None)

    # Get LLM
    llm = get_llm(model_type, adapter_name)

    # Load tools
    tools = get_all_tools()

    # Safe tool binding
    try:
        llm_with_tools = llm.bind_tools(tools)
        response = llm_with_tools.invoke(messages)
    except NotImplementedError:
        # Ollama or unsupported models
        response = llm.invoke(messages)
    except Exception as e:
        print(f"⚠️ Tool binding failed: {e}")
        response = llm.invoke(messages)

    return {"messages": [response]}


# =========================
# 4. ROUTING LOGIC
# =========================
def should_continue(state: AgentState):
    last_message = state["messages"][-1]

    # If model wants to call a tool
    if hasattr(last_message, "tool_calls") and last_message.tool_calls:
        return "tools"

    return END


# =========================
# 5. MAIN GENERATION PIPELINE
# =========================
def generate_answer(
    query: str,
    context: list = [],
    history: list = [],
    model_type: str = "general",
    adapter_name: str | None = None,
    system_context: str | None = None,
):
    """
    Generates an answer using LangGraph with dynamic context injection.
    Fully crash-safe and supports dual brain system.
    """

    # -------------------------
    # 1. Build context block
    # -------------------------
    if system_context:
        knowledge_block = system_context
    else:
        knowledge_block = "\n\n".join(
            [f"- {item.get('text', '')}" for item in context]
        )

    # -------------------------
    # 2. System prompt
    # -------------------------
    system_text = f"""
You are the AI Twin of a software engineer named Yash.

[YOUR BRAIN / CONTEXT]
{knowledge_block}

[RULES]
1. Use the [RELEVANT PAST MEMORIES] section when available.
2. Prioritize the current conversation for coding questions.
3. Use tools only when external data is required.
4. Be direct, technical, and concise.
"""

    if model_type == "local" and adapter_name:
        system_text += (
            f"\n(SYSTEM NOTE: Running local adapter: {adapter_name})"
        )

    # -------------------------
    # 3. Format history
    # -------------------------
    formatted_history = []

    for msg in history:
        role = msg.get("role")
        content = msg.get("content")

        if role == "user":
            formatted_history.append(HumanMessage(content=content))
        elif role == "assistant":
            formatted_history.append(AIMessage(content=content))

    # -------------------------
    # 4. Initial state
    # -------------------------
    system_msg = SystemMessage(content=system_text)
    initial_messages = (
        [system_msg] + formatted_history + [HumanMessage(content=query)]
    )

    # -------------------------
    # 5. Build graph
    # -------------------------
    workflow = StateGraph(AgentState)

    workflow.add_node("agent", call_model)
    workflow.add_node("tools", ToolNode(get_all_tools()))

    workflow.set_entry_point("agent")

    workflow.add_conditional_edges(
        "agent",
        should_continue,
        {
            "tools": "tools",
            END: END,
        },
    )

    workflow.add_edge("tools", "agent")

    app = workflow.compile()

    # -------------------------
    # 6. Execute
    # -------------------------
    inputs = {
        "messages": initial_messages,
        "model_type": model_type,
        "adapter_name": adapter_name,
    }

    try:
        result = app.invoke(inputs)
        return result["messages"][-1].content
    except Exception as e:
        print(f"❌ Generation failed: {e}")
        return "Sorry, something went wrong while generating the response."
