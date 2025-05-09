# services/openai_parser.py
import os
from openai import OpenAI
import json

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def parse_filters_with_openai(user_query: str) -> dict:
    prompt = f"""
You are an assistant for returning adult students. Convert this user query into a structured JSON object
with filters for school search.

User query: "{user_query}"

Respond ONLY with a JSON object with any of the following keys:
- state (2-letter code)
- program (e.g. nursing, business)
- max_tuition (as number, in USD)
- school_name
- schedule (e.g. part-time, full-time)
- delivery (e.g. online, in-person)

If you're not sure about a value, omit it.
"""

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            { "role": "user", "content": prompt }
        ],
        temperature=0.3
    )

    message = response.choices[0].message.content.strip()
    return json.loads(message)
