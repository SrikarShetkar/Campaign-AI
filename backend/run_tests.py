import sys
import os

# Add backend dir to sys.path
sys.path.insert(0, os.path.dirname(__file__))

from fastapi.testclient import TestClient
from app.main import app

def run_all_tests():
    client = TestClient(app)
    print("🚀 Starting Enterprise AI Marketing Backend Integration Tests...")

    # 1. Health check
    res = client.get("/health")
    assert res.status_code == 200, f"Health check failed: {res.text}"
    print("✅ /health passed.")

    # 2. Dashboard
    res = client.get("/dashboard")
    assert res.status_code == 200, f"Dashboard failed: {res.text}"
    assert res.json()["success"] is True
    print("✅ /dashboard passed.")

    # 3. Campaign Generator RAG
    payload_campaign = {
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
    res = client.post("/campaign", json=payload_campaign)
    assert res.status_code == 200, f"Campaign failed: {res.text}"
    data = res.json()["data"]
    assert "campaign_title" in data
    assert len(data["retrieved_sources"]) > 0
    print(f"✅ /campaign passed. Generated Title: '{data['campaign_title']}' with {len(data['retrieved_sources'])} retrieved RAG sources.")

    # 4. Competitor Analyzer
    payload_comp = {
        "brand_name": "AuraPure",
        "category": "Skincare",
        "region": "North America"
    }
    res = client.post("/competitor-analysis", json=payload_comp)
    assert res.status_code == 200, f"Competitor analysis failed: {res.text}"
    assert res.json()["success"] is True
    print("✅ /competitor-analysis passed.")

    # 5. Sales Optimizer
    payload_sales = {
        "product": "AuraPure Serum",
        "current_price": 35.00,
        "inventory": 15000,
        "monthly_sales": 2000,
        "campaign_goal": "Maximize Revenue"
    }
    res = client.post("/sales-optimizer", json=payload_sales)
    assert res.status_code == 200, f"Sales optimizer failed: {res.text}"
    assert res.json()["success"] is True
    print("✅ /sales-optimizer passed.")

    # 6. Knowledge Base Status
    res = client.get("/knowledge-base/status")
    assert res.status_code == 200, f"KB status failed: {res.text}"
    assert res.json()["data"]["total_documents"] > 0
    print(f"✅ /knowledge-base/status passed ({res.json()['data']['total_documents']} documents indexed).")

    # 7. Rebuild Index
    res = client.post("/rebuild-index")
    assert res.status_code == 200, f"Rebuild index failed: {res.text}"
    print("✅ /rebuild-index passed.")

    # 8. Analytics
    res = client.get("/analytics")
    assert res.status_code == 200, f"Analytics failed: {res.text}"
    print("✅ /analytics passed.")

    print("\n🎉 ALL BACKEND INTEGRATION TESTS PASSED SUCCESSFULLY!")

if __name__ == "__main__":
    run_all_tests()
