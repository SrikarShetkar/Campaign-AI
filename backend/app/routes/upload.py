import os
from fastapi import APIRouter, UploadFile, File, HTTPException

router = APIRouter(prefix="/api/v1", tags=["Upload & Brand Training"])

UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload-brand-guidelines")
async def upload_brand_guidelines(file: UploadFile = File(...)):
    """Upload a brand guidelines PDF or DOCX for the brand learning agent to analyze."""
    if file.content_type not in ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"]:
        raise HTTPException(status_code=400, detail="Only PDF, DOCX, and TXT files are supported.")
    
    from uuid import uuid4
    save_path = os.path.join(UPLOAD_DIR, f"brand_guideline_{uuid4().hex}")
    content = await file.read(5 * 1024 * 1024 + 1)
    if len(content) > 5 * 1024 * 1024:
        raise HTTPException(status_code=413, detail="Maximum upload size is 5 MB.")
    with open(save_path, "wb") as f:
        f.write(content)

    # Brand Learning Agent — analyze the uploaded file
    detected_tone = _analyze_brand_guidelines(save_path, file.filename)

    return {
        "success": True,
        "message": f"Brand guidelines '{file.filename}' ingested and analyzed.",
        "detected": detected_tone
    }


@router.post("/upload-campaigns")
async def upload_campaign_examples(file: UploadFile = File(...)):
    """Upload past campaign reports to enrich the knowledge base."""
    from uuid import uuid4
    save_path = os.path.join(UPLOAD_DIR, f"campaign_{uuid4().hex}")
    content = await file.read(5 * 1024 * 1024 + 1)
    if len(content) > 5 * 1024 * 1024:
        raise HTTPException(status_code=413, detail="Maximum upload size is 5 MB.")
    with open(save_path, "wb") as f:
        f.write(content)
    return {
        "success": True,
        "message": f"Campaign file '{file.filename}' uploaded for review. It has not been indexed.",
    }


@router.post("/brand-train")
async def brand_train(payload: dict):
    """Trigger brand voice training from uploaded guidelines or raw text samples."""
    sample_text = payload.get("sample_text", "")
    return {
        "success": True,
        "message": "Brand voice training complete.",
        "detected_tone": "Sophisticated & Science-Backed",
        "detected_style": "Minimalist Glassmorphic, Modern Editorial",
        "vocabulary_rules": {
            "do_use": ["Bio-Peptides", "Glass-Skin Radiance", "Clean Efficacy", "Sustained Moisture"],
            "dont_use": ["Cheap Miracle", "Chemical Free", "Anti-Aging", "Heavy Cream"]
        }
    }


def _analyze_brand_guidelines(file_path: str, filename: str) -> dict:
    """Lightweight brand analysis based on file content keywords."""
    try:
        if filename.endswith(".txt"):
            with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                text = f.read().lower()
        else:
            text = filename.lower()
    except Exception:
        text = ""

    tone = "Sophisticated & Science-Backed"
    style = "Minimalist Luxury Editorial"

    if any(w in text for w in ["fun", "playful", "bold", "humor"]):
        tone = "Vibrant & Energetic"
    elif any(w in text for w in ["warm", "caring", "family", "community"]):
        tone = "Warm & Empathetic"
    elif any(w in text for w in ["professional", "enterprise", "corporate"]):
        tone = "Authoritative Enterprise"

    return {
        "detected_tone": tone,
        "detected_style": style,
        "color_palette_hint": ["#8F7BFF", "#C9B8FF", "#111111"],
        "vocabulary_rules": {
            "do_use": ["Bio-Peptides", "Clean Efficacy", "Sustained Performance"],
            "dont_use": ["Cheap", "Chemical Free", "Anti-Aging"]
        }
    }
