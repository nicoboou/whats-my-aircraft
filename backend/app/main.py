"""Main module."""
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
import requests
from io import BytesIO

import torch
from fastapi import FastAPI, File, UploadFile
from PIL import Image

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = torch.hub.load("ultralytics/yolov5", "custom", path="best.onnx")


@app.post("/analyse")
async def process(file: UploadFile = File(...)):
    results = model(Image.open(BytesIO(await file.read())))
    return results.pandas().xyxy[0].to_dict(orient="records")


@app.get("/")
def root() -> Response:
    """Health check."""
    return Response(status_code=200)


@app.get("/api/hello")
def say_hello():
    return f"Hello !"


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", reload=True, port=8888)  # nosec
