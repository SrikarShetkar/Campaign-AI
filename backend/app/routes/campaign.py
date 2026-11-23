import logging
from typing import Dict, Any, List
from fastapi import APIRouter, HTTPException, status, Query, Depends, Header
from app.schemas.campaign_schemas import (
    CampaignGeneratorInput, CompetitorAnalyzerInput, SalesOptimizerInput
)
from app.rag.vector_store import vector_store
from app.rag.llm_engine import llm_engine
from app.rag.loader import loader

from app.config.settings import settings
from fastapi import Request

def require_admin(x_admin_key: str | None = Header(default=None)):
    if not settings.ADMIN_API_KEY or x_admin_key != settings.ADMIN_API_KEY:
        raise HTTPException(status_code=403, detail="Admin access required")

logger = logging.getLogger("campaignmind.routes")
router = APIRouter(tags=["Enterprise AI Marketing OS"])

# History in-memory buffer
CAMPAIGN_HISTORY: List[Dict[str, Any]] = []

@router.post("/campaign")
@router.post("/api/v1/campaign")
@router.post("/api/v1/generate-campaign")
async def generate_campaign(payload: CampaignGeneratorInput):
    """Feature 1 — AI Marketing Campaign Generator backed by RAG RetrievalQA."""
    try:
        data_dict = payload.model_dump(by_alias=True)
        query = f"{data_dict.get('brand_name')} {data_dict.get('product')} {data_dict.get('product_category')} {data_dict.get('campaign_goal')} {data_dict.get('festival')}"
        retrieved_docs = vector_store.query_knowledge_base(query, top_k=5)
        
        result = llm_engine.generate_campaign_rag(data_dict, retrieved_docs)
        CAMPAIGN_HISTORY.append(result)
        
        return {
            "success": True,
            "message": "AI Campaign Strategy successfully generated with RAG retrieval.",
            "data": result
        }
    except Exception as e:
        logger.error(f"Campaign generation error: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/competitor-analysis")
@router.post("/api/v1/competitor-analysis")
async def analyze_competitors(payload: CompetitorAnalyzerInput):
    """Feature 2 — Brand Competitor Analyzer with SWOT & Recommendations."""
    try:
        data_dict = payload.model_dump(by_alias=True)
        query = f"competitor {data_dict.get('brand_name')} {data_dict.get('category')} {data_dict.get('region')}"
        retrieved_docs = vector_store.query_knowledge_base(query, category_filter="competitor_campaigns", top_k=5)
        if not retrieved_docs:
            retrieved_docs = vector_store.query_knowledge_base(query, top_k=5)

        result = llm_engine.generate_competitor_analysis_rag(data_dict, retrieved_docs)
        return {
            "success": True,
            "message": "Competitor intelligence report generated successfully.",
            "data": result
        }
    except Exception as e:
        logger.error(f"Competitor analysis error: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/sales-optimizer")
@router.post("/api/v1/sales-optimizer")
async def optimize_sales(payload: SalesOptimizerInput):
    """Feature 3 — Sales & Discount Optimizer with inventory reduction & ROI graph data."""
    try:
        data_dict = payload.model_dump(by_alias=True)
        query = f"sales pricing discount {data_dict.get('product')} {data_dict.get('campaign_goal')}"
        retrieved_docs = vector_store.query_knowledge_base(query, category_filter="sales_history", top_k=5)
        if not retrieved_docs:
            retrieved_docs = vector_store.query_knowledge_base(query, top_k=5)

        result = llm_engine.generate_sales_optimizer_rag(data_dict, retrieved_docs)
        return {
            "success": True,
            "message": "Sales discount optimization computed successfully.",
            "data": result
        }
    except Exception as e:
        logger.error(f"Sales optimizer error: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/dashboard")
@router.get("/api/v1/dashboard")
async def get_dashboard():
    """Feature 4 — Executive Dashboard metrics, performance charts, and recent activity."""
    return {
        "success": True,
        "data": {
            "metrics": {
                "active_campaigns": 42,
                "total_products": len(vector_store.documents) // 3 if vector_store.documents else 500,
                "tracked_competitors": 105,
                "average_roi": "4.6x",
                "sales_growth": "+24.8%",
                "engagement_rate": "5.4%"
            },
            "performance_charts": {
                "campaign_performance": [
                    {"month": "Jan", "reach": 1200000, "conversions": 48000, "roi": 3.8},
                    {"month": "Feb", "reach": 1450000, "conversions": 56000, "roi": 4.1},
                    {"month": "Mar", "reach": 1890000, "conversions": 72000, "roi": 4.5},
                    {"month": "Apr", "reach": 2100000, "conversions": 89000, "roi": 4.7},
                    {"month": "May", "reach": 2650000, "conversions": 104000, "roi": 5.2},
                    {"month": "Jun", "reach": 3100000, "conversions": 128000, "roi": 5.4}
                ],
                "regional_demand": [
                    {"region": "North America", "demand_index": 92},
                    {"region": "Europe", "demand_index": 84},
                    {"region": "Asia Pacific", "demand_index": 96},
                    {"region": "Latin America", "demand_index": 68},
                    {"region": "Middle East", "demand_index": 74}
                ],
                "marketing_channel_performance": [
                    {"channel": "TikTok", "roi": 5.8, "spend": 120000},
                    {"channel": "Instagram", "roi": 4.9, "spend": 180000},
                    {"channel": "Amazon Ads", "roi": 4.2, "spend": 140000},
                    {"channel": "Google Search", "roi": 3.9, "spend": 90000},
                    {"channel": "YouTube Shorts", "roi": 4.4, "spend": 75000}
                ]
            },
            "recent_recommendations": [
                {"title": "Increase TikTok Spend for Skincare", "category": "Channel Optimization", "impact": "High", "score": "94%"},
                {"title": "Launch 72h Flash Sale Pre-Diwali", "category": "Sales Discount", "impact": "Critical", "score": "98%"},
                {"title": "Reposition Bio-Peptide vs LuxeBio", "category": "Competitor Strategy", "impact": "Medium", "score": "89%"}
            ],
            "latest_campaigns": CAMPAIGN_HISTORY[-3:] if CAMPAIGN_HISTORY else []
        }
    }


@router.get("/knowledge-base/status")
@router.get("/api/v1/knowledge-base/status")
async def get_kb_status():
    """Knowledge base status and FAISS vector index health."""
    needs_rebuild, current_hash = vector_store.check_needs_rebuild()
    return {
        "success": True,
        "data": {
            "total_documents": len(vector_store.documents),
            "index_ready": vector_store.index_ready,
            "kb_hash": current_hash,
            "needs_rebuild": needs_rebuild,
            "categories": ["products", "previous_campaigns", "consumer_personas", "competitor_campaigns", "customer_reviews", "sales_history", "festivals", "marketing_playbooks"]
        }
    }


@router.post("/rebuild-index")
@router.post("/api/v1/rebuild-index")
async def rebuild_index(_: None = Depends(require_admin)):
    """Manually rebuild vector index."""
    try:
        vector_store.load_or_rebuild_index(force_rebuild=True)
        return {
            "success": True,
            "message": f"Successfully rebuilt vector index with {len(vector_store.documents)} documents.",
            "data": {"total_documents": len(vector_store.documents), "kb_hash": vector_store.current_hash}
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Index rebuild failed: {str(e)}")


@router.get("/campaign-history")
@router.get("/api/v1/campaign-history")
async def get_campaign_history():
    """Retrieve history log of generated campaigns."""
    return {
        "success": True,
        "count": len(CAMPAIGN_HISTORY),
        "data": CAMPAIGN_HISTORY
    }


@router.get("/analytics")
@router.get("/api/v1/analytics")
async def get_analytics():
    """Deep-dive analytics endpoints."""
    return {
        "success": True,
        "data": {
            "overall_roas": "4.62x",
            "total_campaign_spend": "$2,450,000",
            "total_revenue_generated": "$11,319,000",
            "top_performing_category": "Skincare & Beauty",
            "top_performing_region": "Asia Pacific",
            "channel_efficiency": [
                {"channel": "TikTok", "cpc": "$0.52", "conversion": "5.8%"},
                {"channel": "Instagram", "cpc": "$0.78", "conversion": "4.9%"},
                {"channel": "Amazon Ads", "cpc": "$1.01", "conversion": "4.2%"}
            ]
        }
    }
