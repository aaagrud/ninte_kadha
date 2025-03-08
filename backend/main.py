from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from dotenv import load_dotenv
import httpx
import os
import json
from typing import Union, List, Optional


load_dotenv()

secret = os.getenv("secret")

app = FastAPI()

user_data_storage = {}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],   
)

class BrowserEntry(BaseModel):
    favicon_url: Optional[str] = None
    page_transition_qualifier: Optional[str] = None
    title: str
    url: str
    time_usec: int
    client_id: Optional[str] = None

class BrowserHistory(BaseModel):
    Browser_History: List[BrowserEntry] = Field(alias="Browser History")

@app.get("/")
async def root():
    return {"message" : "Hello me"}

@app.post("/upload")
async def upload_data(user_data: BrowserHistory):
    """Endpoint to receive and store user data."""
    user_data_storage["data"] = user_data.Browser_History  # Store only the list of entries
    return {"message": "User data uploaded successfully"}

@app.get("/story")
async def generateStory():    
    if "data" not in user_data_storage or not user_data_storage["data"]:
         raise HTTPException(status_code=400, detail="No valid data found. Please upload first.")
    
    user_data = user_data_storage["data"]
    #formatted_history = "\n".join([f"- {entry['title']} ({entry['url']})" for entry in user_data])

    prompt = f"""
    Based on the following browser history, generate a speculative and exaggerated life story of the user.
    Your response should be in a fun, quirky, and psychoanalytical tone—like an online personality quiz result.
    
    The user has searched for:
    {user_data}

    Create a story that feels deeply personal, as if you truly understand them. Use humor, sarcasm, and deep insights. It should not be generalised or assuming too much so that the user will not think its personal.
    Drop 'facts' about their personality, habits, and future based on their browsing habits.
    """

    # Using httpx directly since groq 0.0.1 is just a placeholder and doesn't have the chat.completions API
    headers = {
        "Authorization": f"Bearer {secret}",
        "Content-Type": "application/json"
    }
    
    data = {
        "messages": [
            {
                "role": "user",
                "content": prompt
            }
        ],
        "model": "llama-3.3-70b-versatile"
    }
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                "https://api.groq.com/openai/v1/chat/completions",
                headers=headers,
                json=data,
                timeout=60.0
            )
            response.raise_for_status()
            result = response.json()
            return {
                "life story": result["choices"][0]["message"]["content"],
                "status": 200
            }
        except httpx.HTTPError as e:
            raise HTTPException(status_code=500, detail=f"Error calling Groq API: {str(e)}")