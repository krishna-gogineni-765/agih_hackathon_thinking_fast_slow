from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

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