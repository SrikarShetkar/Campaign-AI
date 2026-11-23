from app.rag.vector_store import vector_store


class KnowledgeRetriever:
    """
    Decision Engine + Contextual Retriever.
    Classifies the campaign request, then retrieves the most relevant
    knowledge sub-sets: products, campaigns, personas, competitors,
    frameworks, and festival data.
    """

    # Simple category keyword mapping for the decision engine
    CATEGORY_KEYWORDS = {
        "skincare": ["skincare", "serum", "moisturizer", "beauty", "cosmetics", "glow", "peptide"],
        "automotive": ["car", "ev", "electric", "vehicle", "suv", "sedan", "charging"],
        "wearables": ["watch", "smartwatch", "fitness", "tracker", "wearable", "bio", "health"],
        "fashion": ["clothing", "apparel", "wear", "fashion", "outfit"],
        "food": ["food", "beverage", "drink", "snack", "nutrition"],
        "tech": ["saas", "software", "app", "platform", "digital", "ai", "tech"],
    }

    def classify_category(self, product_name: str, description: str) -> str:
        """Determine the most likely product category from input text."""
        text = f"{product_name} {description}".lower()
        for category, keywords in self.CATEGORY_KEYWORDS.items():
            if any(kw in text for kw in keywords):
                return category
        return "general"

    def retrieve_context(self, campaign_input: dict) -> dict:
        """
        Retrieve multi-domain contextual knowledge for campaign generation.
        Returns a merged context dict used by the Prompt Orchestrator.
        """
        query = f"{campaign_input.get('productName', '')} {campaign_input.get('description', '')} {campaign_input.get('category', '')}"
        category = self.classify_category(
            campaign_input.get("productName", ""),
            campaign_input.get("description", "")
        )

        # Retrieve from each knowledge domain
        similar_products = vector_store.search_similar(query, "products", top_k=3)
        similar_campaigns = vector_store.search_similar(query, "previous_campaigns", top_k=3)
        persona_docs = vector_store.search_similar(query, "consumer_personas", top_k=3)
        competitor_docs = vector_store.search_similar(query, "competitor_campaigns", top_k=2)
        framework_docs = vector_store.search_similar("", "marketing_frameworks", top_k=2)
        festival_docs = vector_store.search_similar(
            campaign_input.get("festival", campaign_input.get("season", "")),
            "festival_data", top_k=2
        )

        return {
            "detected_category": category,
            "retrieved_products": [d["raw_item"] for d in similar_products],
            "retrieved_campaigns": [d["raw_item"] for d in similar_campaigns],
            "retrieved_personas": [d["raw_item"] for d in persona_docs],
            "retrieved_competitors": [d["raw_item"] for d in competitor_docs],
            "retrieved_frameworks": [d["raw_item"] for d in framework_docs],
            "retrieved_festivals": [d["raw_item"] for d in festival_docs],
        }


retriever = KnowledgeRetriever()
