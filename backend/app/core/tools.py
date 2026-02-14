import datetime
from langchain_community.tools.tavily_search import TavilySearchResults
from langchain_experimental.utilities import PythonREPL
from langchain_core.tools import tool
from app.core.vector_store import get_vector_store

# --- 1. WEB SEARCH (Existing) ---
def get_search_tool():
    """
    Returns the Tavily Search Tool.
    """
    return TavilySearchResults(max_results=3)

# --- 2. SYSTEM TIME (New) ---
@tool
def get_current_time():
    """
    Returns the current server date and time. 
    Use this when the user asks 'What time is it?' or 'What is today's date?'.
    """
    now = datetime.datetime.now()
    return now.strftime("%Y-%m-%d %H:%M:%S")

# --- 3. PYTHON CODE EXECUTOR (New) ---
@tool
def python_repl_tool(code: str):
    """
    A Python shell. Use this to execute python code.
    Input should be a valid python command.
    Use this for:
    - Complex math (e.g., "calculate 234 * 432")
    - Data processing
    - Logic puzzles
    """
    repl = PythonREPL()
    try:
        # We strip backticks in case the LLM tries to send markdown
        clean_code = code.strip("`").replace("python", "")
        result = repl.run(clean_code)
        return f"Result: {result}"
    except Exception as e:
        return f"Error executing code: {e}"

# --- 4. NOTE/MEMORY SEARCH (New) ---
@tool
def search_my_notes(query: str):
    """
    Search specifically through the user's long-term vector memory.
    Use this when the user asks about their own past files, projects, or ideas.
    """
    store = get_vector_store()
    if not store:
        return "Memory store unavailable."
        
    # Search for top 3 relevant chunks
    results = store.similarity_search(query, k=3)
    return "\n---\n".join([doc.page_content for doc in results])

# --- AGGREGATOR ---
def get_all_tools():
    """
    Returns a list of ALL available tools for the Agent.
    """
    return [
        get_search_tool(),   # Web
        get_current_time,    # Time
        python_repl_tool,    # Math/Code
        search_my_notes      # Memory
    ]

# Backward-compatible alias expected by older imports
def get_tools():
    return get_all_tools()
