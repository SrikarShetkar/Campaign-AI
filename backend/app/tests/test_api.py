"""
Integration tests for the Enterprise AI Marketing Platform backend.
Run with: pytest app/tests/ -v
"""
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check():
    resp = client.get("/health")
    assert resp.status_code == 200
    data = resp.json()
    assert data["status"] == "operational"

def test_campaign_generator():
    payload = {
        "brand_name": "AuraPure",
        "product": "Bio-Active Hydrating Serum",
        "product_category": "Skincare",
        "campaign_goal": "Customer Acquisition",
        "budget": 120000,
        "target_audience": "Gen-Z & Eco-conscious Millennials",
        "region": "North America",
        "marketing_channels": ["Instagram", "TikTok"],
        "season": "Autumn",
        "festival": "Black Friday & Cyber Monday",
        "campaign_duration": "30 Days"
    }
    resp = client.post("/campaign", json=payload)
    assert resp.status_code == 200
    data = resp.json()
    assert data["success"] is True
    assert "campaign_title" in data["data"]
    assert data["data"]["generation_mode"] == "template"
    assert data["data"]["estimated_reach"] == "Not forecast"
    assert len(data["data"]["retrieved_sources"]) > 0

def test_competitor_analysis():
    payload = {
        "brand_name": "AuraPure",
        "category": "Skincare",
        "region": "North America"
    }
    resp = client.post("/competitor-analysis", json=payload)
    assert resp.status_code == 200
    data = resp.json()
    assert data["success"] is True
    assert "competitor_table" in data["data"]
    assert "swot_analysis" in data["data"]

def test_sales_optimizer():
    payload = {
        "product": "AuraPure Serum",
        "current_price": 35.00,
        "inventory": 15000,
        "monthly_sales": 2000,
        "campaign_goal": "Maximize Revenue"
    }
    resp = client.post("/sales-optimizer", json=payload)
    assert resp.status_code == 200
    data = resp.json()
    assert data["success"] is True
    assert "suggested_discount" in data["data"]
    assert "revenue_forecast" in data["data"]

def test_dashboard():
    resp = client.get("/dashboard")
    assert resp.status_code == 200
    data = resp.json()
    assert data["success"] is True
    assert "metrics" in data["data"]
    assert "performance_charts" in data["data"]

def test_kb_status():
    resp = client.get("/knowledge-base/status")
    assert resp.status_code == 200
    data = resp.json()
    assert data["success"] is True
    assert data["data"]["total_documents"] > 0

def test_rebuild_index():
    resp = client.post("/rebuild-index")
    assert resp.status_code == 403

def test_analytics():
    resp = client.get("/analytics")
    assert resp.status_code == 200
    data = resp.json()
    assert data["success"] is True


def test_campaign_input_aliases_reach_generator():
    response = client.post("/campaign", json={
        "brandName": "TestBrand", "productName": "TestProduct",
        "category": "Food", "campaignGoal": "Awareness",
        "budget": 1200, "festival": "Diwali"
    })
    assert response.status_code == 200
    data = response.json()["data"]
    assert "TestBrand" in data["campaign_title"]
    assert "TestProduct" in data["campaign_title"]
    assert data["metrics_are_estimates"] is True


def test_competitor_aliases():
    response = client.post("/competitor-analysis", json={
        "brandName": "NewBrand", "category": "Food", "region": "India"
    })
    assert response.status_code == 200
    assert response.json()["data"]["brand_name"] == "NewBrand"
