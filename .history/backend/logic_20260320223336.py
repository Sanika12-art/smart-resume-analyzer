def extract_skills(text):
    skills = [
        "python", "sql", "machine learning", "data analysis",
        "excel", "power bi", "java", "html", "css", "javascript"
    ]

    text = text.lower()
    found_skills = []

    for skill in skills:
        if skill in text:
            found_skills.append(skill)

    return found_skills


def match_skills(found_skills, job_role):
    job_requirements = {
        "Data Analyst": ["python", "sql", "excel", "power bi"],
        "AI Engineer": ["python", "machine learning", "data analysis"],
        "Web Developer": ["html", "css", "javascript"]
    }

    required = job_requirements.get(job_role, [])

    matched = [s for s in found_skills if s in required]
    missing = [s for s in required if s not in found_skills]

    score = int((len(matched) / len(required)) * 100) if required else 0

    return score, missing