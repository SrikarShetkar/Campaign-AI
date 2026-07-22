import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "CampaignMind AI Enterprise"
    ENV: str = "development"
    PORT: int = 8000
    HOST: str = "0.0.0.0"

    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    LLM_MODEL: str = "gpt-4o"
    EMBEDDING_MODEL: str = "text-embedding-3-small"

    VECTOR_STORE_DIR: str = os.path.join(os.path.dirname(__file__), "..", "knowledge_base", "vector_index")
    KNOWLEDGE_BASE_DIR: str = os.path.join(os.path.dirname(__file__), "..", "knowledge_base")
    PROMPTS_DIR: str = os.path.join(os.path.dirname(__file__), "..", "prompts")

    JWT_SECRET_KEY: str = "campaignmind-super-secret-enterprise-jwt-key-2026"
    CORS_ORIGINS: list[str] = ["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173", "*"]

    class Config:
        env_file = ".env"
        extra = "allow"

settings = Settings()
