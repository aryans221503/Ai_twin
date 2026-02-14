import os
import glob
import sqlite3
from pypdf import PdfReader
from datetime import datetime

# ==========================================
# ⚙️ CONFIGURATION
# ==========================================
DB_PATH = "../backend/test.db" 
RAW_DATA_FOLDER = "raw_data"

# Toggle this to False ONLY when you are ready to save to the database!
# When True, it just prints what it found to the terminal so you can verify.
DRY_RUN = True 

# How do names appear in your PDF? (Case-insensitive)
YOUR_NAME = "yash:"       # Change this if your PDF says "Me:" or "Yash Sharma:"
AI_NAME = "assistant:"    # Change this if the other person is "John:" or "AI:"

# Hardcoded user_id to match your backend's authentication
USER_ID = "yash"
# ==========================================

def extract_text_from_pdf(file_path):
    """Reads the PDF and returns raw text."""
    reader = PdfReader(file_path)
    text = ""
    for page in reader.pages:
        # extract_text can sometimes return None
        page_text = page.extract_text()
        if page_text:
            text += page_text + "\n"
    return text

def parse_chat_log(raw_text):
    """
    Transforms the raw wall of text into structured (role, content) pairs.
    """
    messages = []
    lines = raw_text.split('\n')
    
    current_role = None
    buffer = []

    for line in lines:
        line = line.strip()
        if not line:
            continue

        lower_line = line.lower()

        # 1. Did the User (You) speak?
        if lower_line.startswith(YOUR_NAME):
            # Save the previous message if there was one
            if current_role and buffer:
                messages.append((current_role, " ".join(buffer)))
            
            current_role = "user"
            # Remove the name tag from the actual message
            # e.g., "Yash: Hello" -> "Hello"
            clean_text = line[len(YOUR_NAME):].strip()
            buffer = [clean_text]

        # 2. Did the AI (or your friend) speak?
        elif lower_line.startswith(AI_NAME):
            if current_role and buffer:
                messages.append((current_role, " ".join(buffer)))
            
            current_role = "assistant"
            clean_text = line[len(AI_NAME):].strip()
            buffer = [clean_text]

        # 3. Continuation of a multi-line paragraph
        else:
            # If we haven't found a starting name yet, we ignore the line (might be PDF headers/dates)
            if current_role and buffer:
                buffer.append(line)

    # Don't forget the very last message in the file!
    if current_role and buffer:
        messages.append((current_role, " ".join(buffer)))
        
    return messages

def save_to_database(messages):
    """Connects to the FastAPI SQLite DB and inserts the messages."""
    if not os.path.exists(DB_PATH):
        print(f"❌ Error: Could not find database at {DB_PATH}")
        return

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    count = 0
    now = datetime.utcnow().isoformat()

    for role, content in messages:
        # Assuming your table is named 'memory' with columns: user_id, role, content, timestamp
        cursor.execute(
            """
            INSERT INTO memory (user_id, role, content, timestamp) 
            VALUES (?, ?, ?, ?)
            """,
            (USER_ID, role, content, now)
        )
        count += 1
    
    conn.commit()
    conn.close()
    print(f"💾 Successfully saved {count} messages to your AI's Memory Database!")

def main():
    print("🚀 Starting Ingestion Pipeline...")
    
    # 1. Look for PDFs
    pdf_files = glob.glob(os.path.join(RAW_DATA_FOLDER, "*.pdf"))
    if not pdf_files:
        print(f"❌ No PDFs found. Please put your chat logs in: {RAW_DATA_FOLDER}/")
        return

    print(f"📂 Found {len(pdf_files)} PDF(s).")

    all_messages = []

    # 2. Process each PDF
    for pdf in pdf_files:
        print(f"   📄 Reading: {pdf}...")
        raw_text = extract_text_from_pdf(pdf)
        parsed_msgs = parse_chat_log(raw_text)
        all_messages.extend(parsed_msgs)

    # 3. Dry Run Check
    if DRY_RUN:
        print("\n" + "="*50)
        print("🛑 DRY RUN MODE IS ACTIVE 🛑")
        print("The database has NOT been modified. Here is what I found:")
        print("="*50)
        
        # Print the first 10 messages so you can verify the formatting
        for i, (role, content) in enumerate(all_messages[:10]):
            print(f"[{role.upper()}] -> {content}")
        
        print("\n" + "="*50)
        print(f"Total messages parsed: {len(all_messages)}")
        print("If the above looks correct, open ingest.py, set DRY_RUN = False, and run again!")
    
    # 4. Actual Save
    else:
        save_to_database(all_messages)

if __name__ == "__main__":
    main()