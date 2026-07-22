import json


class PromptBuilder:
    """
    Builds contextually-enriched, multi-stage prompt strings for each AI agent.
    Each prompt includes: user intent, retrieved knowledge, and the agent's directive.
    Never sends raw user input to the LLM — always enriched with RAG context first.
    """

    def build_research_prompt(self, campaign_input: dict, context: dict) -> str:
        return f"""You are an Expert Marketing Research Analyst for a Fortune 500 brand.
Using the knowledge base context below, produce a structured research report.

=== CAMPAIGN INPUT ===
Product: {campaign_input.get('productName', 'N/A')}
Brand: {campaign_input.get('brandName', 'N/A')}
Category: {campaign_input.get('category', 'N/A')}
Description: {campaign_input.get('description', 'N/A')}
USP: {campaign_input.get('usp', 'N/A')}
Competitors: {campaign_input.get('competitors', 'N/A')}

=== RETRIEVED SIMILAR CAMPAIGNS ===
{json.dumps(context.get('retrieved_campaigns', []), indent=2)}

=== RETRIEVED COMPETITOR DATA ===
{json.dumps(context.get('retrieved_competitors', []), indent=2)}

=== TASK ===
Produce a JSON object with these keys:
- product_analysis: Strengths, differentiation, ingredient/tech highlights
- competitor_summary: What competitors are doing, their weaknesses to exploit
- market_opportunity: White space in the market this product can own
- knowledge_evidence: State which retrieved data you used to justify recommendations
"""

    def build_persona_prompt(self, campaign_input: dict, context: dict) -> str:
        return f"""You are a Consumer Psychology & Audience Strategy expert.
Using retrieved consumer persona datasets, craft 2 rich buyer personas for this campaign.

=== TARGET AUDIENCE INPUT ===
Age: {campaign_input.get('ageRange', 'N/A')}
Gender: {campaign_input.get('gender', 'N/A')}
Income: {campaign_input.get('income', 'N/A')}
Location: {campaign_input.get('location', 'N/A')}
Lifestyle: {campaign_input.get('lifestyle', 'N/A')}
Pain Points: {campaign_input.get('painPoints', 'N/A')}

=== RETRIEVED CONSUMER PERSONAS ===
{json.dumps(context.get('retrieved_personas', []), indent=2)}

=== TASK ===
Return a JSON object with key "personas" containing a list of 2 personas, each with:
- persona_name, age_range, gender, lifestyle, pain_points (list), buying_journey, emotional_triggers (list), preferred_platforms (list)
- explanation: why this persona was selected based on retrieved data
"""

    def build_creative_prompt(self, campaign_input: dict, context: dict) -> str:
        frameworks_text = json.dumps(context.get('retrieved_frameworks', []), indent=2)
        return f"""You are a Creative Director and Brand Strategist.
Apply a marketing framework from the knowledge base to craft a compelling creative strategy.

=== CAMPAIGN BRIEF ===
Product: {campaign_input.get('productName', 'N/A')}
Goal: {campaign_input.get('campaignGoal', 'N/A')}
Brand Tone: {campaign_input.get('brandTone', 'N/A')}
Season/Festival: {campaign_input.get('festival', campaign_input.get('season', 'N/A'))}

=== RETRIEVED MARKETING FRAMEWORKS ===
{frameworks_text}

=== RETRIEVED FESTIVAL CONTEXT ===
{json.dumps(context.get('retrieved_festivals', []), indent=2)}

=== TASK ===
Return a JSON object with:
- campaign_theme: The overarching creative concept
- brand_narrative: 3-4 sentence brand story
- core_message: One-line brand promise
- positioning_statement: How the brand occupies a unique mental space
- applied_framework: Which framework was used and why
- festival_hook: How the festival/season is leveraged (if applicable)
"""

    def build_copywriting_prompt(self, campaign_input: dict, creative_strategy: dict) -> str:
        return f"""You are a World-Class Copywriter specializing in luxury and enterprise brands.
Based on the creative strategy below, generate complete multi-platform campaign copy.

=== CREATIVE STRATEGY ===
Theme: {creative_strategy.get('campaign_theme', 'N/A')}
Core Message: {creative_strategy.get('core_message', 'N/A')}
Brand Narrative: {creative_strategy.get('brand_narrative', 'N/A')}

=== CAMPAIGN PARAMETERS ===
Product: {campaign_input.get('productName', 'N/A')}
Brand Tone: {campaign_input.get('brandTone', 'N/A')}
Language: {campaign_input.get('language', 'English (US)')}
Region: {campaign_input.get('region', 'Global')}

=== TASK ===
Return a JSON object with:
- campaign_name: Full enterprise campaign title
- tagline: Memorable brand tagline (max 8 words)
- instagram_caption: Engaging post (200-250 chars) with relevant hashtags
- tiktok_caption: Punchy scroll-stopping hook + CTA (under 150 chars)
- linkedin_post: Professional thought-leadership copy (150-200 chars)
- twitter_post: Concise viral tweet under 280 chars
- email_subject: Email subject line (max 60 chars)
- email_preview_text: Email preview text (max 90 chars)
- email_body: Full email body with personalization placeholders
- sms_copy: SMS marketing message under 160 chars
- push_notification: Mobile push notification title + body
- cta_options: List of 3 CTA button text variants
- hashtags: List of 10 relevant hashtags
"""

    def build_visual_prompt(self, campaign_input: dict, creative_strategy: dict) -> str:
        return f"""You are a Visual Art Director specializing in luxury brand identity.
Create highly detailed AI image generation prompts for all creative assets.

=== CAMPAIGN THEME ===
{creative_strategy.get('campaign_theme', 'N/A')}
Core Message: {creative_strategy.get('core_message', 'N/A')}
Product: {campaign_input.get('productName', 'N/A')}
Brand Tone: {campaign_input.get('brandTone', 'N/A')}

=== TASK ===
Return a JSON object with Midjourney/DALL-E prompts for:
- poster_prompt: Hyper-detailed luxury poster prompt (cinematic, 8K, award-winning composition)
- instagram_creative_prompt: Square format social ad prompt
- banner_prompt: Digital banner advertisement (leaderboard format)
- packaging_prompt: Premium product packaging design prompt
- billboard_prompt: Outdoor advertising billboard prompt
- product_photography_prompt: Clean e-commerce product shot prompt
"""

    def build_video_prompt(self, campaign_input: dict, creative_strategy: dict) -> str:
        return f"""You are a Commercial Video Director and Storyboard Artist.
Create a complete 30-second video advertisement concept.

=== CAMPAIGN BRIEF ===
Product: {campaign_input.get('productName', 'N/A')}
Campaign Theme: {creative_strategy.get('campaign_theme', 'N/A')}
Core Message: {creative_strategy.get('core_message', 'N/A')}
Brand Tone: {campaign_input.get('brandTone', 'N/A')}

=== TASK ===
Return a JSON object with:
- scenes: List of 4-5 scenes, each with: scene_number, duration_seconds, description, camera_angle, visual_elements, voiceover_text
- total_duration: e.g., "30 seconds"
- music_mood: e.g., "cinematic orchestral build with soft electronic undertones"
- color_grading: e.g., "warm champagne gold tones with deep onyx shadows"
- cta_scene: Final CTA scene description and text
"""

    def build_budget_prompt(self, campaign_input: dict, context: dict) -> str:
        return f"""You are a Performance Marketing Director and Media Buyer.
Allocate the campaign budget optimally across channels, project ROI.

=== BUDGET INPUT ===
Total Budget: {campaign_input.get('budget', '$50,000')}
Duration: {campaign_input.get('duration', '30 Days')}
Region: {campaign_input.get('region', 'Global')}
Campaign Goal: {campaign_input.get('campaignGoal', 'Brand Awareness')}
Target Audience: {campaign_input.get('ageRange', '25-40')} | {campaign_input.get('gender', 'All')}

=== RETRIEVED CAMPAIGN BENCHMARKS ===
{json.dumps(context.get('retrieved_campaigns', [])[:2], indent=2)}

=== TASK ===
Return a JSON object with:
- channel_allocation: list of channels, each with: channel_name, budget_amount, budget_percentage, expected_reach, expected_clicks, expected_ctr, expected_cpc, justification
- total_projected_reach: string
- total_projected_conversions: string
- projected_roi: string (e.g. "4.8x")
- roi_explanation: Why this ROI is achievable, citing benchmark data
"""

    def build_evaluation_prompt(self, full_campaign: dict) -> str:
        return f"""You are a Senior Marketing Evaluation Specialist and Brand Strategist.
Evaluate this AI-generated campaign blueprint across 6 dimensions and provide actionable suggestions.

=== CAMPAIGN TO EVALUATE ===
Campaign Name: {full_campaign.get('campaign_name', 'N/A')}
Tagline: {full_campaign.get('tagline', 'N/A')}
Target Audience: {full_campaign.get('personas', [{}])[0].get('persona_name', 'N/A') if full_campaign.get('personas') else 'N/A'}
Projected ROI: {full_campaign.get('projected_roi', 'N/A')}
Applied Framework: {full_campaign.get('applied_framework', 'N/A')}

=== TASK ===
Return a JSON object with:
- scores: dict with keys creativity (0-100), trend_alignment (0-100), brand_consistency (0-100), market_fit (0-100), virality_potential (0-100), roi_feasibility (0-100)
- overall_score: weighted average 0-100
- grade: "S-Tier" | "A-Tier" | "B-Tier" | "C-Tier"
- strengths: list of 3 campaign strengths with evidence
- suggestions: list of 3 specific, actionable optimization recommendations
- explainability: One-paragraph explanation of why this campaign will (or won't) succeed with evidence and framework references
"""


prompt_builder = PromptBuilder()
