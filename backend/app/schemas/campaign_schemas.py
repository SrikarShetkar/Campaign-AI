from pydantic import BaseModel, Field
from typing import Optional, List, Any, Dict

class CampaignGeneratorInput(BaseModel):
    brand_name: Optional[str] = Field(default="AuraPure", alias="brandName")
    product: Optional[str] = Field(default="Bio-Active Serum", alias="productName")
    product_category: Optional[str] = Field(default="Skincare", alias="category")
    campaign_goal: Optional[str] = Field(default="Customer Acquisition", alias="campaignGoal")
    budget: Optional[float] = Field(default=150000.0)
    target_audience: Optional[str] = Field(default="Gen-Z & Eco-conscious Millennials", alias="targetAudience")
    region: Optional[str] = Field(default="North America")
    marketing_channels: Optional[List[str]] = Field(default=["Instagram", "TikTok", "Amazon Ads"], alias="marketingChannels")
    season: Optional[str] = Field(default="Autumn")
    festival: Optional[str] = Field(default="Black Friday & Cyber Monday")
    campaign_duration: Optional[str] = Field(default="30 Days", alias="duration")

    class Config:
        populate_by_name = True

class CompetitorAnalyzerInput(BaseModel):
    brand_name: Optional[str] = Field(default="AuraPure", alias="brandName")
    category: Optional[str] = Field(default="Skincare")
    region: Optional[str] = Field(default="North America")

    class Config:
        populate_by_name = True

class SalesOptimizerInput(BaseModel):
    product: Optional[str] = Field(default="AuraPure Serum", alias="productName")
    current_price: Optional[float] = Field(default=35.00, alias="currentPrice")
    inventory: Optional[int] = Field(default=12000)
    monthly_sales: Optional[int] = Field(default=1800, alias="monthlySales")
    campaign_goal: Optional[str] = Field(default="Maximize Revenue & Margin", alias="campaignGoal")

    class Config:
        populate_by_name = True

class EvaluationInput(BaseModel):
    campaign_name: str
    tagline: Optional[str] = ""
    personas: Optional[List[dict]] = []
    projected_roi: Optional[str] = ""
    applied_framework: Optional[str] = ""

class CompareInput(BaseModel):
    productName: str
    brandName: str
    category: Optional[str] = "Skincare"
    description: Optional[str] = ""
    brandTone: Optional[str] = "Sophisticated & Science-Backed"

class ForecastInput(BaseModel):
    category: str = "Skincare"
    region: str = "North America"
