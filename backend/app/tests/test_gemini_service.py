"""Offline tests: no paid Gemini calls or credentials required."""
import json
from unittest.mock import patch
import httpx
import pytest
from app.rag.gemini_service import (
    CampaignOutput, GeminiGenerationError, _source_context, generate_gemini_campaign,
)


def sample_campaign():
    return {
        "campaign_title": "TestBrand Launch",
        "campaign_strategy": "Focus on relevant buyers",
        "customer_insights": ["Test message with the audience"],
        "marketing_angle": "Practical everyday value",
        "target_persona": {"name": "Buyer", "demographics": "Adults", "pain_points": ["Cost"], "buying_triggers": ["Value"]},
        "suggested_platforms": ["Instagram"],
        "budget_allocation": [{"channel": "Instagram", "percentage": "100%", "amount": "1000"}],
        "campaign_calendar": [{"week": "Week 1", "phase": "Launch", "action": "Publish posts"}],
        "content_ideas": ["Product introduction"],
        "social_media_captions": {"instagram": "Discover TestBrand"},
        "video_ideas": ["Product demo"],
        "email_campaign": {"subject": "Discover TestBrand", "preview": "Learn more", "body": "Hello"},
        "hashtags": ["#TestBrand"],
    }


def test_output_schema_rejects_missing_required_fields():
    with pytest.raises(Exception):
        CampaignOutput.model_validate({"campaign_title": "Incomplete"})


def test_source_context_filters_zero_scores_and_limits_count():
    sources, context = _source_context([
        {"source_file": "a.json", "text": "relevant", "similarity_score": 0.8},
        {"source_file": "b.json", "text": "irrelevant", "similarity_score": 0},
    ])
    assert len(sources) == 1
    assert "relevant" in context


def test_missing_api_key_fails_closed(monkeypatch):
    monkeypatch.setattr("app.rag.gemini_service.settings.GEMINI_API_KEY", "")
    with pytest.raises(GeminiGenerationError):
        generate_gemini_campaign({"brand_name": "TestBrand"}, [])


def test_structured_response_and_source_metadata(monkeypatch):
    monkeypatch.setattr("app.rag.gemini_service.settings.GEMINI_API_KEY", "test-only")
    response = httpx.Response(200, json={
        "candidates": [{"content": {"parts": [{"text": json.dumps(sample_campaign())}]}}]
    }, request=httpx.Request("POST", "https://example.com"))
    with patch("app.rag.gemini_service.httpx.Client") as client_cls:
        client_cls.return_value.__enter__.return_value.post.return_value = response
        result = generate_gemini_campaign(
            {"brand_name": "TestBrand"},
            [{"source_file": "products.json", "category": "products", "text": "Product context", "similarity_score": 0.7}],
        )
    assert result["generation_mode"] == "gemini_rag"
    assert result["campaign_title"] == "TestBrand Launch"
    assert result["retrieved_sources"][0]["source_file"] == "products.json"
    assert result["estimated_reach"] == "Not forecast"


def test_provider_error_does_not_fall_back_to_template(monkeypatch):
    monkeypatch.setattr("app.rag.gemini_service.settings.GEMINI_API_KEY", "test-only")
    with patch("app.rag.gemini_service.httpx.Client") as client_cls:
        client_cls.return_value.__enter__.return_value.post.side_effect = httpx.ConnectError("offline")
        with pytest.raises(GeminiGenerationError):
            generate_gemini_campaign({"brand_name": "TestBrand"}, [])
