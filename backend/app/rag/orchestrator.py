"""
Campaign Orchestrator — Sequential Multi-Agent Pipeline.
Coordinates all 12 specialized agents:
  1. Research → 2. Persona → 3. Creative → 4. Copywriting →
  5. Visual → 6. Video → 7. Budget → 8. Evaluation
Plus: Comparison, Forecast, Brand-Learning agents exposed via dedicated endpoints.
"""
import uuid
from datetime import datetime
from app.rag.retriever import retriever
from app.rag.prompt_builder import prompt_builder
from app.rag.llm_engine import llm_engine

# In-memory campaign store (replace with DB in Phase 3)
_campaign_history: list[dict] = []


class CampaignOrchestrator:

    def generate_campaign(self, campaign_input: dict) -> dict:
        """
        Full multi-agent pipeline:
        RAG retrieval → Research → Persona → Creative →
        Copywriting → Visual → Video → Budget → Evaluation → Merge
        """
        campaign_id = f"cmp-{uuid.uuid4().hex[:8].upper()}"
        created_at = datetime.utcnow().isoformat()

        # ── Step 0: RAG Decision Engine + Retrieval ──────────────────────
        context = retriever.retrieve_context(campaign_input)

        # ── Step 1: Research Agent ────────────────────────────────────────
        research_prompt = prompt_builder.build_research_prompt(campaign_input, context)
        research = llm_engine.generate(research_prompt)

        # ── Step 2: Persona Agent ─────────────────────────────────────────
        persona_prompt = prompt_builder.build_persona_prompt(campaign_input, context)
        persona_data = llm_engine.generate(persona_prompt)
        personas = persona_data.get("personas", [])

        # ── Step 3: Creative Strategy Agent ──────────────────────────────
        creative_prompt = prompt_builder.build_creative_prompt(campaign_input, context)
        creative = llm_engine.generate(creative_prompt)

        # ── Step 4: Copywriting Agent ─────────────────────────────────────
        copy_prompt = prompt_builder.build_copywriting_prompt(campaign_input, creative)
        copy_data = llm_engine.generate(copy_prompt)

        # ── Step 5: Visual Agent ──────────────────────────────────────────
        visual_prompt = prompt_builder.build_visual_prompt(campaign_input, creative)
        visual_data = llm_engine.generate(visual_prompt)

        # ── Step 6: Video Agent ───────────────────────────────────────────
        video_prompt = prompt_builder.build_video_prompt(campaign_input, creative)
        video_data = llm_engine.generate(video_prompt)

        # ── Step 7: Budget Agent ──────────────────────────────────────────
        budget_prompt = prompt_builder.build_budget_prompt(campaign_input, context)
        budget_data = llm_engine.generate(budget_prompt)

        # ── Step 8: Evaluation Agent ──────────────────────────────────────
        partial_campaign = {
            "campaign_name": copy_data.get("campaign_name", ""),
            "tagline": copy_data.get("tagline", ""),
            "personas": personas,
            "projected_roi": budget_data.get("projected_roi", ""),
            "applied_framework": creative.get("applied_framework", ""),
        }
        eval_prompt = prompt_builder.build_evaluation_prompt(partial_campaign)
        evaluation = llm_engine.generate(eval_prompt)

        # ── Merge Full Blueprint ──────────────────────────────────────────
        blueprint = {
            "id": campaign_id,
            "status": "Active",
            "created_at": created_at,
            # Input Echo
            "product_name": campaign_input.get("productName", ""),
            "brand_name": campaign_input.get("brandName", ""),
            "category": campaign_input.get("category", ""),
            # Agent Outputs
            "research": research,
            "personas": personas,
            "creative_strategy": creative,
            "copy": copy_data,
            "visual_assets": visual_data,
            "video_storyboard": video_data,
            "budget": budget_data,
            "evaluation": evaluation,
            # Flattened for frontend compatibility
            "name": copy_data.get("campaign_name", f"{campaign_input.get('productName', 'New')} Campaign"),
            "tagline": copy_data.get("tagline", "Powered by AI."),
            "brand": campaign_input.get("brandName", ""),
            "executiveSummary": research.get("market_opportunity", ""),
            "campaignScore": evaluation.get("overall_score", 90),
            "trendScore": evaluation.get("scores", {}).get("trend_alignment", 90),
            "virality": evaluation.get("scores", {}).get("virality_potential", 88),
            "projectedRoi": budget_data.get("projected_roi", "4.5x"),
            "targetReach": budget_data.get("total_projected_reach", "1.2M"),
            "budget_input": campaign_input.get("budget", "$50,000"),
            "duration": campaign_input.get("duration", "30 Days"),
            "persona": personas[0] if personas else {},
            "story": creative.get("brand_narrative", ""),
            "socialPosts": [
                {"platform": "Instagram", "copy": copy_data.get("instagram_caption", ""), "engagementEstimate": "48.2k interactions"},
                {"platform": "TikTok", "copy": copy_data.get("tiktok_caption", ""), "engagementEstimate": "125k views"},
                {"platform": "LinkedIn", "copy": copy_data.get("linkedin_post", ""), "engagementEstimate": "3.4k impressions"},
            ],
            "emailSequence": [
                {
                    "subject": copy_data.get("email_subject", ""),
                    "previewText": copy_data.get("email_preview_text", ""),
                    "body": copy_data.get("email_body", ""),
                }
            ],
            "posterPrompt": visual_data.get("poster_prompt", ""),
            "videoPrompt": video_data.get("scenes", [{}])[0].get("description", "") if isinstance(video_data.get("scenes"), list) and video_data.get("scenes") else str(video_data),
            "suggestions": evaluation.get("suggestions", []),
        }

        # ── Persist to In-Memory History ──────────────────────────────────
        _campaign_history.insert(0, blueprint)

        return blueprint

    def get_history(self) -> list[dict]:
        return _campaign_history

    def evaluate_campaign(self, campaign_data: dict) -> dict:
        eval_prompt = prompt_builder.build_evaluation_prompt(campaign_data)
        return llm_engine.generate(eval_prompt)

    def compare_campaigns(self, campaign_input: dict) -> dict:
        context = retriever.retrieve_context(campaign_input)
        creative = llm_engine.generate(
            prompt_builder.build_creative_prompt(campaign_input, context)
        )
        comp_prompt = f"""You are a Senior Campaign Strategist.
Generate 3 distinct campaign versions (Luxury/Sophisticated, Emotional/Human, Humorous/Bold)
for this product, then compare them and pick a winner.

Product: {campaign_input.get('productName', 'N/A')}
Brand: {campaign_input.get('brandName', 'N/A')}
Core Message: {creative.get('core_message', 'N/A')}

Return JSON with: version_a, version_b, version_c (each with: name, tagline, tone,
primary_angle, ctr_estimate, roi, virality, score), winner, winner_rationale."""
        return llm_engine.generate(comp_prompt)

    def forecast_trends(self, category: str, region: str) -> dict:
        forecast_prompt = f"""You are a Marketing Intelligence Analyst.
Forecast emerging marketing trends for:
Category: {category}
Region: {region}

Return JSON with:
- emerging_keywords: list of 5 keywords with growth_rate
- seasonal_demand: list of seasonal opportunities in next 90 days
- consumer_behavior_shifts: list of 3 emerging behavior patterns
- recommended_campaign_ideas: list of 3 specific campaign concepts with rationale
"""
        return llm_engine.generate(forecast_prompt)


orchestrator = CampaignOrchestrator()
