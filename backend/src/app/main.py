from fastapi import FastAPI
from app.routes import router

app = FastAPI(title="Distributed App API", 
              description="Backend API for the distributed application system",
              version="0.1.0")

app.include_router(router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Distributed App API"}
