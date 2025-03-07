from fastapi import FastAPI
from dotenv import load_dotenv
from groq import Groq
from utils.py import process_browser_history
import os


load_dotenv()

secret = os.getenv("secret")

app = FastAPI()
client = Groq(
    api_key=os.environ.get("secret"),
)

@app.get("/")
async def root():
    return {"message" : "Hello World"}

@app.get("/secrets")
async def generateStory():

    file_path = "data.json"
    user_data = process_browser_history(file_path)

    if not user_data:
            return {"error" : "no valid data found"}
    
    formatted_history = "\n".join([f"- {entry['title']} ({entry['url']})" for entry in user_data])

    prompt = f"""
    Based on the following browser history, generate a speculative and exaggerated life story of the user.
    Your response should be in a fun, quirky, and psychoanalytical tone—like an online personality quiz result.
    
    The user has searched for:
    {formatted_history}

    Create a story that feels deeply personal, as if you truly understand them. Use humor, sarcasm, and deep insights. It should not be generalised or assuming too much so that the user will not think its personal.
    Drop 'facts' about their personality, habits, and future based on their browsing habits.
    """

    chat_completion = client.chat.completions.create(
        messages = [
            {
                "role" : "user",
                "content" : prompt,
            }
        ],
        model="llama-3.3-70b-versatile",
    )
    return {"life story" : chat_completion.choices[0].message.content}