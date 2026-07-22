import os
import json
import random
from datetime import datetime, timedelta

KB_DIR = os.path.join(os.path.dirname(__file__), "app", "knowledge_base")
os.makedirs(KB_DIR, exist_ok=True)

CATEGORIES = [
    "Food", "Beverages", "Skincare", "Cosmetics", "Hair Care", "Oral Care", 
    "Household Cleaning", "Laundry", "Baby Care", "Health Drinks", "Packaged Foods", 
    "Personal Hygiene", "Frozen Foods", "Dairy", "Snacks", "Tea", "Coffee", 
    "Energy Drinks", "Spices", "Cooking Oils", "Pet Care"
]

BRANDS = [
    "AuraPure", "NourishGlow", "VitalRoot", "EcoSparkle", "PureSprout", "VelvetDew",
    "AquaVita", "ZenBite", "CrispHarvest", "LuminaCare", "RadiantSkin", "FreshBlend",
    "NatureFeast", "BotanicaHerbs", "SolaceHome", "PrimePaws", "GlowEssence", "SilkStrand",
    "BreezeClean", "PeakFuel", "VelvetBrew", "SpiceCraft", "PureDairy", "SnackSphere"
]

REGIONS = ["North America", "Europe", "Asia Pacific", "Latin America", "Middle East & Africa"]

FESTIVALS = [
    "Diwali", "Black Friday & Cyber Monday", "Christmas & New Year", "Lunar New Year",
    "Valentine's Day", "Mother's Day", "Summer Solstice Sale", "Back to School",
    "EID Celebrations", "Halloween Special", "Spring Wellness Week"
]

CHANNELS = ["Instagram", "TikTok", "YouTube Shorts", "Amazon Ads", "Google Search", "Meta Ads", "Retail Media Network", "Influencer Marketing", "TV & Connected TV"]

# Set random seed for reproducible rich generation
random.seed(42)

def generate_products():
    products = []
    adjectives = ["Organic", "Ultra-Hydrating", "Artisanal", "Eco-Friendly", "Probiotic", "Cold-Pressed", "Zero Sugar", "Velvet-Touch", "Bio-Active", "Sparkling", "Triple-Action", "Raw & Unfiltered", "Plant-Based", "Dermatologist-Approved", "Superfood", "Natural", "High-Protein", "Non-GMO", "Gluten-Free", "Gentle Care"]
    nouns = ["Serum", "Moisturizer", "Cleanser", "Sparkling Water", "Energy Drink", "Cold Brew", "Granola", "Protein Bar", "Dishwash Gel", "Detergent Pods", "Baby Wipes", "Conditioner", "Shampoo", "Face Mask", "Olive Oil", "Turmeric Powder", "Cat Kibble", "Dog Dental Chews", "Kombucha", "Yogurt Drink"]
    
    for i in range(1, 505):
        cat = CATEGORIES[i % len(CATEGORIES)]
        brand = BRANDS[i % len(BRANDS)]
        adj = random.choice(adjectives)
        noun = random.choice(nouns)
        name = f"{brand} {adj} {noun} v{i}"
        price = round(random.uniform(2.99, 89.99), 2)
        margin = round(random.uniform(35.0, 75.0), 1)
        rating = round(random.uniform(3.8, 4.9), 1)
        reviews_count = random.randint(120, 8500)
        stock = random.randint(500, 45000)
        
        products.append({
            "product_id": f"PRD-{1000 + i}",
            "brand": brand,
            "name": name,
            "category": cat,
            "price": price,
            "margin_percentage": margin,
            "rating": rating,
            "review_count": reviews_count,
            "stock_level": stock,
            "description": f"Premium CPG product in {cat} formulated with top-tier ingredient standards, eco-packaging, and clinical effectiveness.",
            "ingredients_key": ["Organic Aloe", "Vitamin C", "Omega-3", "Active Probiotics", "Hyaluronic Acid", "Natural Botanical Extracts"][i % 6],
            "lifecycle_stage": random.choice(["Growth", "Mature", "Launch Phase", "High Demand"]),
            "shelf_life_days": random.randint(90, 730),
            "target_demographic": random.choice(["Gen Z", "Millennial Parents", "Eco-conscious Professionals", "Active Adults 25-45", "Senior Wellness"])
        })
    
    return products

def generate_previous_campaigns():
    campaigns = []
    objectives = ["Brand Awareness", "Customer Acquisition", "Retention & LTV Boost", "Product Launch Blitz", "Holiday Promo", "Inventory Clearance"]
    angles = ["Eco-Conscious Living", "Scientific Proof & Glow", "Clean & Simple Life", "Peak Daily Performance", "Family First Safety", "Indulgent Self-Care"]
    
    for i in range(1, 1005):
        brand = BRANDS[i % len(BRANDS)]
        cat = CATEGORIES[i % len(CATEGORIES)]
        budget = random.randint(15000, 450000)
        roi = round(random.uniform(1.8, 6.4), 2)
        reach = random.randint(80000, 12000000)
        clicks = int(reach * random.uniform(0.02, 0.08))
        conversions = int(clicks * random.uniform(0.04, 0.15))
        
        campaigns.append({
            "campaign_id": f"CMP-{2000 + i}",
            "title": f"{brand} {random.choice(FESTIVALS)} {random.choice(objectives)}",
            "brand_name": brand,
            "category": cat,
            "goal": random.choice(objectives),
            "budget": budget,
            "spend": int(budget * random.uniform(0.92, 1.0)),
            "revenue_generated": int(budget * roi),
            "roi": roi,
            "reach": reach,
            "clicks": clicks,
            "conversions": conversions,
            "channels": random.sample(CHANNELS, k=random.randint(2, 5)),
            "region": random.choice(REGIONS),
            "marketing_angle": random.choice(angles),
            "key_performance_indicators": {
                "CTR": f"{round(clicks/reach*100, 2)}%",
                "CPA": f"${round(budget/max(conversions,1), 2)}",
                "ROAS": f"{roi}x"
            },
            "summary": f"Successful marketing campaign for {brand} targeting {cat} consumers across high-converting digital touchpoints."
        })
    return campaigns

def generate_personas():
    personas = []
    archetypes = [
        "Eco-Conscious Millennial Mom", "Gen-Z Bio-Hacker", "Urban Fitness Enthusiast",
        "Busy Executive Parent", "Clean-Beauty Loyalist", "Budget-Smart Household Shopper",
        "Gourmet Home Chef", "Pet Parent Pioneer", "Holistic Wellness Seeker", "Minimalist Skincare Junkie"
    ]
    
    for i in range(1, 305):
        arch = archetypes[i % len(archetypes)]
        personas.append({
            "persona_id": f"PER-{3000 + i}",
            "name": f"{arch} #{i}",
            "archetype": arch,
            "age_range": random.choice(["18-24", "25-34", "35-44", "45-54", "55+"]),
            "household_income": random.choice(["$45k-$70k", "$75k-$110k", "$120k-$180k", "$200k+"]),
            "primary_categories": random.sample(CATEGORIES, k=3),
            "core_values": ["Sustainability", "Ingredient Transparency", "Convenience", "Clinical Efficacy", "Cruelty-Free", "Affordable Luxury"],
            "pain_points": [
                "Overwhelmed by synthetic ingredients",
                "High prices for organic alternatives",
                "Lack of proof in marketing claims",
                "Inconsistent product availability in retail stores"
            ],
            "preferred_channels": random.sample(CHANNELS, k=3),
            "purchase_frequency": random.choice(["Weekly", "Bi-weekly", "Monthly", "Quarterly"]),
            "avg_basket_size": round(random.uniform(32.50, 165.00), 2)
        })
    return personas

def generate_competitors():
    competitors = []
    comp_names = [
        "LuxeBio", "PureHarvest Co", "GlowGurus", "EcoClean Global", "NutriLife",
        "Zenith Beauty", "VelvetBlend", "ApexCPG", "OrganicEssence", "VitalityLabs"
    ]
    
    for i in range(1, 105):
        brand = random.choice(BRANDS)
        comp = f"{comp_names[i % len(comp_names)]} ({i})"
        cat = CATEGORIES[i % len(CATEGORIES)]
        
        competitors.append({
            "competitor_id": f"CMPTR-{4000 + i}",
            "target_brand": brand,
            "competitor_name": comp,
            "category": cat,
            "market_share_percent": round(random.uniform(3.5, 24.0), 1),
            "average_price_point": round(random.uniform(8.99, 79.99), 2),
            "positioning": random.choice(["Premium Clean", "Mass Market Value", "Dermatology Grade", "Ultra-Luxury Organic", "Direct-to-Consumer Disruptor"]),
            "strengths": ["Strong TikTok virality", "Deep retail distribution", "Aggressive subscription discount", "High customer loyalty"],
            "weaknesses": ["Higher price sensitivity", "Slower shipping times", "Limited product shade/flavor range"],
            "rating": round(random.uniform(3.7, 4.8), 1),
            "social_followers": random.randint(50000, 2500000)
        })
    return competitors

def generate_reviews():
    reviews = []
    sentiments = ["Positive", "Positive", "Positive", "Neutral", "Critical"]
    
    for i in range(1, 505):
        sent = random.choice(sentiments)
        reviews.append({
            "review_id": f"REV-{5000 + i}",
            "product_id": f"PRD-{1000 + (i % 500) + 1}",
            "rating": random.randint(4, 5) if sent == "Positive" else (3 if sent == "Neutral" else random.randint(1, 2)),
            "sentiment": sent,
            "customer_name": f"User_{random.randint(1000, 9999)}",
            "review_text": f"This product delivered {sent.lower()} outcomes. Texture and packaging felt premium, and delivery was prompt.",
            "date": (datetime.now() - timedelta(days=random.randint(1, 180))).strftime("%Y-%m-%d"),
            "verified_purchase": True,
            "region": random.choice(REGIONS)
        })
    return reviews

def generate_sales_history():
    sales = []
    for i in range(1, 505):
        sales.append({
            "sale_id": f"SLS-{6000 + i}",
            "product_id": f"PRD-{1000 + (i % 500) + 1}",
            "date": (datetime.now() - timedelta(days=random.randint(1, 365))).strftime("%Y-%m-%d"),
            "region": random.choice(REGIONS),
            "units_sold": random.randint(400, 15000),
            "revenue": round(random.uniform(5000, 250000), 2),
            "discount_applied_percent": random.choice([0, 10, 15, 20, 25, 30]),
            "channel": random.choice(CHANNELS),
            "festival_overlap": random.choice([None, "Diwali", "Black Friday", "Summer Sale", "Holiday Season"])
        })
    return sales

def generate_all():
    print("Generating 15 realistic dataset JSONs for Knowledge Base...")
    
    # 1. products.json
    products = generate_products()
    with open(os.path.join(KB_DIR, "products.json"), "w", encoding="utf-8") as f:
        json.dump(products, f, indent=2)
    
    # 2. previous_campaigns.json
    campaigns = generate_previous_campaigns()
    with open(os.path.join(KB_DIR, "previous_campaigns.json"), "w", encoding="utf-8") as f:
        json.dump(campaigns, f, indent=2)
        
    # 3. consumer_personas.json
    personas = generate_personas()
    with open(os.path.join(KB_DIR, "consumer_personas.json"), "w", encoding="utf-8") as f:
        json.dump(personas, f, indent=2)
        
    # 4. competitor_campaigns.json / competitors.json
    competitors = generate_competitors()
    with open(os.path.join(KB_DIR, "competitor_campaigns.json"), "w", encoding="utf-8") as f:
        json.dump(competitors, f, indent=2)
        
    # 5. customer_reviews.json
    reviews = generate_reviews()
    with open(os.path.join(KB_DIR, "customer_reviews.json"), "w", encoding="utf-8") as f:
        json.dump(reviews, f, indent=2)
        
    # 6. sales_history.json
    sales = generate_sales_history()
    with open(os.path.join(KB_DIR, "sales_history.json"), "w", encoding="utf-8") as f:
        json.dump(sales, f, indent=2)

    # 7. marketing_channels.json
    channels_data = [
        {"channel": "Instagram", "cpm": 8.50, "avg_ctr": "2.4%", "top_cpg_categories": ["Skincare", "Cosmetics", "Beverages", "Snacks"], "best_format": "Reels & Story Ads"},
        {"channel": "TikTok", "cpm": 6.20, "avg_ctr": "3.1%", "top_cpg_categories": ["Beauty", "Personal Hygiene", "Gen Z Snacks", "Energy Drinks"], "best_format": "Short Vertical Video"},
        {"channel": "Amazon Ads", "cpm": 14.80, "avg_ctr": "4.2%", "top_cpg_categories": ["Household Cleaning", "Baby Care", "Packaged Foods", "Coffee"], "best_format": "Sponsored Products"},
        {"channel": "YouTube Shorts", "cpm": 7.90, "avg_ctr": "2.1%", "top_cpg_categories": ["Health Drinks", "Hair Care", "Pet Care"], "best_format": "15s Video Shorts"},
        {"channel": "Meta Ads", "cpm": 10.20, "avg_ctr": "2.8%", "top_cpg_categories": ["All CPG Categories"], "best_format": "Carousel & Video"}
    ]
    with open(os.path.join(KB_DIR, "marketing_channels.json"), "w", encoding="utf-8") as f:
        json.dump(channels_data, f, indent=2)

    # 8. market_trends.json
    market_trends = [
        {"trend_id": "TRD-01", "name": "Clean Label & Transparent Sourcing", "impact_score": 9.4, "description": "84% of CPG buyers scrutinize product ingredients, demanding non-toxic and zero artificial additives."},
        {"trend_id": "TRD-02", "name": "Micro-Moments & TikTok Commerce", "impact_score": 9.1, "description": "Instant impulse purchases via TikTok Shop and Instagram Checkout for sub-$30 CPG items."},
        {"trend_id": "TRD-03", "name": "Refillable & Plastic-Free Packaging", "impact_score": 8.8, "description": "Consumer preference for zero-waste packaging in household cleaning, shampoos, and personal hygiene."},
        {"trend_id": "TRD-04", "name": "Functional Beverages & Gut Health", "impact_score": 9.5, "description": "Surge in prebiotic sodas, kombucha, and adaptogenic teas over traditional high-sugar energy drinks."}
    ]
    with open(os.path.join(KB_DIR, "market_trends.json"), "w", encoding="utf-8") as f:
        json.dump(market_trends, f, indent=2)

    # 9. festivals.json
    festivals_data = [
        {"festival_name": "Diwali", "peak_period": "October - November", "high_demand_categories": ["Sweets & Packaged Foods", "Skincare", "Gift Sets", "Beverages"], "avg_sales_multiplier": 2.8},
        {"festival_name": "Black Friday & Cyber Monday", "peak_period": "Late November", "high_demand_categories": ["Beauty Bundles", "Electronics CPG", "Pet Care Supply"], "avg_sales_multiplier": 3.4},
        {"festival_name": "Christmas & Holiday Season", "peak_period": "December", "high_demand_categories": ["Gourmet Food", "Fine Tea/Coffee", "Luxury Cosmetics"], "avg_sales_multiplier": 3.1},
        {"festival_name": "Summer Wellness Blitz", "peak_period": "June - July", "high_demand_categories": ["Hydration Drinks", "Sunscreen & Skincare", "Frozen Snacks"], "avg_sales_multiplier": 2.2}
    ]
    with open(os.path.join(KB_DIR, "festivals.json"), "w", encoding="utf-8") as f:
        json.dump(festivals_data, f, indent=2)

    # 10. brand_guidelines.json
    brand_guidelines = [
        {"brand": "AuraPure", "tone": "Serene, Scientific, Eco-luxurious", "forbidden_words": ["Cheap", "Miracle", "Chemical-free"], "primary_hex": "#8F7BFF"},
        {"brand": "NourishGlow", "tone": "Vibrant, Energetic, Empathetic", "forbidden_words": ["Old", "Flawed", "Instant Fix"], "primary_hex": "#C9B8FF"},
        {"brand": "VitalRoot", "tone": "Grounding, Organic, Transparent", "forbidden_words": ["Synthetic", "Standard", "Artificial"], "primary_hex": "#A5B8FF"}
    ]
    with open(os.path.join(KB_DIR, "brand_guidelines.json"), "w", encoding="utf-8") as f:
        json.dump(brand_guidelines, f, indent=2)

    # 11. marketing_playbooks.json
    marketing_playbooks = [
        {"playbook_id": "PB-01", "name": "The Pre-Festival Flash Sale Blitz", "recommended_discount": "20-30%", "target_roi": 3.8, "key_steps": ["Teaser 7 days prior", "VIP Early Access via SMS", "Limited Time Bundle Countdown"]},
        {"playbook_id": "PB-02", "name": "New Product Launch - Creator Seed Strategy", "recommended_discount": "15% Intro Offer", "target_roi": 4.2, "key_steps": ["Send PR boxes to 150 micro-creators", "Launch TikTok Hashtag Challenge", "Retarget engagees with Meta Carousel"]}
    ]
    with open(os.path.join(KB_DIR, "marketing_playbooks.json"), "w", encoding="utf-8") as f:
        json.dump(marketing_playbooks, f, indent=2)

    # 12. product_categories.json
    categories_data = [
        {"category": cat, "sub_categories": [f"{cat} Premium", f"{cat} Eco", f"{cat} Daily"], "annual_growth_rate": f"{round(random.uniform(4.5, 14.2), 1)}%"} for cat in CATEGORIES
    ]
    with open(os.path.join(KB_DIR, "product_categories.json"), "w", encoding="utf-8") as f:
        json.dump(categories_data, f, indent=2)

    # 13. pricing_history.json
    pricing_history = [
        {"product_id": f"PRD-{1000 + i}", "original_msrp": 29.99, "promotional_price": 23.99, "elasticity_coefficient": -1.8} for i in range(1, 100)
    ]
    with open(os.path.join(KB_DIR, "pricing_history.json"), "w", encoding="utf-8") as f:
        json.dump(pricing_history, f, indent=2)

    # 14. inventory_data.json
    inventory_data = [
        {"product_id": f"PRD-{1000 + i}", "warehouse_loc": "US-East-1", "available_units": random.randint(2000, 25000), "reorder_point": 1500} for i in range(1, 100)
    ]
    with open(os.path.join(KB_DIR, "inventory_data.json"), "w", encoding="utf-8") as f:
        json.dump(inventory_data, f, indent=2)

    # 15. regional_preferences.json
    regional_preferences = [
        {"region": "North America", "top_preferred_channel": "TikTok & Amazon", "eco_sensitivity": "High"},
        {"region": "Europe", "top_preferred_channel": "Instagram & Retail Media", "eco_sensitivity": "Very High"},
        {"region": "Asia Pacific", "top_preferred_channel": "Live Shopping & Social Messaging", "eco_sensitivity": "Medium-High"}
    ]
    with open(os.path.join(KB_DIR, "regional_preferences.json"), "w", encoding="utf-8") as f:
        json.dump(regional_preferences, f, indent=2)

    print(f"Successfully generated all 15 Knowledge Base JSON datasets in: {KB_DIR}")

if __name__ == "__main__":
    generate_all()
