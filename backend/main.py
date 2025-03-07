from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from dotenv import load_dotenv
from groq import Groq
from utils import process_browser_history
import os
import json


load_dotenv()

secret = os.getenv("secret")

app = FastAPI()
client = Groq(
    api_key=os.environ.get("secret"),
)

user_data_storage = {}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],   
)

class BrowserEntry(BaseModel):
    favicon_url: str | None
    page_transition_qualifier: str | None
    title: str
    url: str
    time_usec: int
    client_id: str | None

class BrowserHistory(BaseModel):
    Browser_History: list[BrowserEntry] = Field(alias="Browser History")

@app.get("/")
async def root():
    return {"message" : "Hello me"}

@app.post("/upload")
async def upload_data(user_data: BrowserHistory):
    """Endpoint to receive and store user data."""
    print(user_data.Browser_History)
    user_data_storage["data"] = user_data.Browser_History  # Store only the list of entries
    return {"message": "User data uploaded successfully"}

@app.get("/story")
async def generateStory():    
    print("*********************")
    print(user_data_storage)
    if "data" not in user_data_storage or not user_data_storage["data"]:
         raise HTTPException(status_code=400, detail="No valid data found. Please upload first.")
    
    user_data = user_data_storage["data"]
    print("*********************")
    print(user_data)
    #formatted_history = "\n".join([f"- {entry['title']} ({entry['url']})" for entry in user_data])

    prompt = f"""
    Based on the following browser history, generate a speculative and exaggerated life story of the user.
    Your response should be in a fun, quirky, and psychoanalytical tone—like an online personality quiz result.
    
    The user has searched for:
    {user_data}

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
    return {
                "life story" : chat_completion.choices[0].message.content,
                "status" : 200
            }