import logging
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.config.settings import settings
from app.routes.campaign import router as campaign_router
from app.routes.export import router as export_router
from app.routes.upload import router as upload_router

# ── Logging Configuration ────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("campaignmind")

# ── FastAPI Application ──────────────────────────────────────────────────────
app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Enterprise AI Marketing Operating System — Multi-Agent RAG Campaign Generation API",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# ── CORS Middleware ──────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Request Logging Middleware ───────────────────────────────────────────────
@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"→ {request.method} {request.url.path}")
    response = await call_next(request)
    logger.info(f"← {response.status_code} {request.url.path}")
    return response

# ── Global Exception Handler ─────────────────────────────────────────────────
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"success": False, "detail": str(exc)}
    )

# ── Register Routers ──────────────────────────────────────────────────────────
app.include_router(campaign_router)
app.include_router(export_router)
app.include_router(upload_router)

# ── Health Check ──────────────────────────────────────────────────────────────
@app.get("/health", tags=["System"])
async def health_check():
    from app.rag.vector_store import vector_store
    from app.rag.llm_engine import llm_engine
    return {
        "status": "operational",
        "project": settings.PROJECT_NAME,
        "version": "2.0.0",
        "knowledge_base_docs": len(vector_store.documents),
        "llm_mode": "openai" if llm_engine.use_openai else "intelligent_mock",
    }

@app.get("/", tags=["System"])
async def root():
    return {
        "message": "CampaignMind AI Enterprise OS — API v2.0 is running.",
        "docs": "/docs",
        "health": "/health",
    }
