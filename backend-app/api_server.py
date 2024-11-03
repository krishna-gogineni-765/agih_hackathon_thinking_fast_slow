from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict

app = FastAPI()

# Allow CORS so that the frontend can communicate with this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate-hint")
async def generate_hint(request: Request):
    data = await request.json()
    current_code = data.get("current_code", "")
    changed_line_code = data.get("changed_line_code", "")

    # For now, return a fixed response
    return {
        "hint": f"Received your code. Current code length: {len(current_code)}. Changed line: {changed_line_code}"
    }

@app.get("/get-question")
async def get_question() -> Dict[str, str]:
    # For now, return a hardcoded question
    question = {
        "title": "Two Sum",
        "description": """
            Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.

            **Example:**
            Input: nums = [2,7,11,15], target = 9 Output: [0,1] Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

            **Note:**

            - You may assume that each input would have exactly one solution.
            - You may not use the same element twice.
            - You can return the answer in any order.
        """
    }
    return question