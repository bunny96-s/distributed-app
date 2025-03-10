import os
from dotenv import load_dotenv

load_dotenv()

# Get DATABASE_URL from environment variable or use default
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://kishan98:testdb@db:5432/app_db")
