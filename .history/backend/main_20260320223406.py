from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import shutil
import pdfplumber
import os

from logic import extract_skills, match_skills
from db import save_result

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "../uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.get("/")
def home():
    return {"message": "Resume Analyzer API Running"}


@app.post("/analyze")
async def analyze_resume(
    job_role: str = Form(...),
    resume: UploadFile = File(...)
):
    file_path = os.path.join(UPLOAD_FOLDER, resume.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(resume.file, buffer)

    text = ""

    if resume.filename.endswith(".pdf"):
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + " "
    else:
        return {"error": "Only PDF files are supported"}

    found_skills = extract_skills(text)
    score, missing = match_skills(found_skills, job_role)

    missing_skills_text = ", ".join(missing) if missing else "None"

    save_result(resume.filename, job_role, score, missing_skills_text)

    return {
        "filename": resume.filename,
        "job_role": job_role,
        "match_score": score,
        "found_skills": found_skills,
        "missing_skills": missing
    }