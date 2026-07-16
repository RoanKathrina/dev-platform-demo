from pathlib import Path
import json

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Developer Platform Mock BFF", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_FILE = Path(__file__).with_name("dashboard.json")


@app.get("/api/dev-platform-dashboard")
def get_dashboard() -> dict:
    """Return a stubbed BFF response for the React dashboard."""
    return json.loads(DATA_FILE.read_text(encoding="utf-8"))
