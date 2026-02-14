import re

class IntentClassifier:
    def __init__(self):
        # Define keywords for specific intents
        self.coding_keywords = {
            "python", "code", "function", "bug", "error", "api", "database", "react", "sql", "java"
        }
        self.factual_keywords = {
            "who is", "what is", "when did", "weather", "news", "price", "population"
        }
        self.personal_keywords = {
            "recall", "remember", "what did i", "my plan", "my notes", "remind me"
        }

    def classify(self, query: str) -> str:
        """
        Returns one of: 'coding', 'factual', 'personal', 'casual'
        """
        query_lower = query.lower()
        
        # 1. Check for Code
        # If user asks to "write a function" or pastes code snippets
        if any(kw in query_lower for kw in self.coding_keywords) or "```" in query_lower:
            return "coding"
            
        # 2. Check for External Facts
        if any(kw in query_lower for kw in self.factual_keywords):
            return "factual"

        # 3. Check for Personal Memory Retrieval
        if any(kw in query_lower for kw in self.personal_keywords):
            return "personal"

        # 4. Default to Casual Chat (handled by Local Persona)
        return "casual"