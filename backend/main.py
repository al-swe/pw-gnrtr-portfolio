from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
import secrets
import string

app = FastAPI()

alphabet = string.ascii_letters + string.digits + '-_!?'

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://pswrd-gnrtr.alansweeney.se"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

@app.get("/")
# Accepts /?length=12 between 8 and 128, default is 12
async def generate_password(length: int = Query(12, ge=8, le=128)):
    try:
        # Generate a secure password using the custom alphabet
        password = ''.join(secrets.choice(alphabet) for _ in range(length))
        return {"password": password}
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid length value provided.")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)