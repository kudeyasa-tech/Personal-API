from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()


@app.get("/hello/{name}")
def hello(name: str):
    return {"message": f"Hello, {name}!"}


@app.get("/")
def root():
    return {"message": "Hello, API!"}


# Serve the frontend (index.html, style.css, app.js) — must be mounted last
app.mount("/", StaticFiles(directory=".", html=True), name="static")