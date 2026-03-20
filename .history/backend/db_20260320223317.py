import pymysql

def get_connection():
    return pymysql.connect(
        host="localhost",
        user="root",
        password="Sanika123",
        database="resume_analyzer_db",
        cursorclass=pymysql.cursors.DictCursor
    )

def save_result(filename, job_role, score, missing_skills):
    conn = get_connection()
    cursor = conn.cursor()

    query = """
    INSERT INTO resume_history (filename, job_role, match_score, missing_skills)
    VALUES (%s, %s, %s, %s)
    """
    cursor.execute(query, (filename, job_role, score, missing_skills))
    conn.commit()

    cursor.close()
    conn.close()