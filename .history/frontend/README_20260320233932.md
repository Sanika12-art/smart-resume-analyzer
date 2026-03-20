# 🚀 AI Resume Analyzer

A full-stack web application that analyzes uploaded resumes and matches them with selected job roles. The system extracts skills, calculates a match score, identifies missing skills, and stores results with history.

---

## 🔥 Features

- Upload PDF Resume  
- Select Job Role (Data Analyst, AI Engineer, Web Developer)  
- Skill Extraction from Resume  
- Match Score Calculation  
- Missing Skills Identification  
- Store Results in MySQL Database  
- View Upload History  
- Full Stack Integration (React + FastAPI)  

---

## 🛠️ Tech Stack

Frontend:
- React.js  
- HTML, CSS  

Backend:
- FastAPI (Python)  
- REST API  

Database:
- MySQL  

Other Tools:
- pdfplumber  
- Git & GitHub  

---

## ⚙️ Project Structure

smart-resume-analyzer/
│
├── backend/
│   ├── main.py
│   ├── db.py
│   ├── logic.py
│   └── requirements.txt
│
├── frontend/
│
├── uploads/
└── database/

---

## 🚀 How to Run Project

1. Clone Repository

git clone https://github.com/YOUR_USERNAME/ai-resume-analyzer.git  
cd ai-resume-analyzer  

2. Backend Setup

cd backend  
pip install -r requirements.txt  
python -m uvicorn main:app --reload --port 8001  

3. Frontend Setup

cd frontend  
npm install  
npm start  

4. Open in Browser

Frontend → http://localhost:3000  
Backend → http://127.0.0.1:8001  

---

## 🗄️ Database Setup

CREATE DATABASE resume_analyzer_db;

USE resume_analyzer_db;

CREATE TABLE resume_history (
    id INT PRIMARY KEY AUTO_INCREMENT,
    filename VARCHAR(255),
    job_role VARCHAR(100),
    match_score INT,
    missing_skills TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

---

## 🧠 How It Works

1. User uploads resume (PDF)  
2. React sends file to FastAPI backend  
3. Backend extracts text using pdfplumber  
4. Skills are identified using Python logic  
5. System compares skills with selected job role  
6. Match score is calculated  
7. Results are stored in MySQL  
8. History is displayed on UI  

---

## 📌 Future Improvements

- Add login/signup  
- Add more job roles  
- Improve skill detection using NLP  
- Deploy project online  

---

## 👩‍💻 Author

Sanika Patil  
GitHub: https://github.com/Sanika12-art  
LinkedIn: https://www.linkedin.com/in/sanikavivekpatil/  

---

## ⭐ Conclusion

This project demonstrates full-stack development skills using React, FastAPI, and MySQL with real-world problem-solving.
