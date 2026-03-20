import React, { useState } from "react";

function App() {
  const [jobRole, setJobRole] = useState("");
  const [resume, setResume] = useState(null);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("job_role", jobRole);
    formData.append("resume", resume);

    const response = await fetch("http://127.0.0.1:8001/analyze", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setResult(data);
  };

  const loadHistory = async () => {
    const response = await fetch("http://127.0.0.1:8001/history");
    const data = await response.json();
    setHistory(data);
  };

  return (
    <div style={{ maxWidth: "700px", margin: "50px auto", fontFamily: "Arial" }}>
      <h1>Smart Resume Analyzer</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Select Job Role: </label>
          <select
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            required
          >
            <option value="">-- Select Role --</option>
            <option value="Data Analyst">Data Analyst</option>
            <option value="AI Engineer">AI Engineer</option>
            <option value="Web Developer">Web Developer</option>
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Upload Resume (PDF): </label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setResume(e.target.files[0])}
            required
          />
        </div>

        <button type="submit" style={{ marginRight: "10px" }}>
          Analyze Resume
        </button>

        <button type="button" onClick={loadHistory}>
          View History
        </button>
      </form>

      {result && (
        <div style={{ marginTop: "30px", padding: "20px", border: "1px solid #ccc" }}>
          <h2>Result</h2>
          <p><strong>File Name:</strong> {result.filename}</p>
          <p><strong>Job Role:</strong> {result.job_role}</p>
          <p><strong>Match Score:</strong> {result.match_score}%</p>
          <p><strong>Found Skills:</strong> {result.found_skills?.join(", ")}</p>
          <p><strong>Missing Skills:</strong> {result.missing_skills?.join(", ") || "None"}</p>
        </div>
      )}

      {history.length > 0 && (
        <div style={{ marginTop: "30px", padding: "20px", border: "1px solid #ccc" }}>
          <h2>Upload History</h2>
          <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>File Name</th>
                <th>Role</th>
                <th>Score</th>
                <th>Missing Skills</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item.id}>
                  <td>{item.filename}</td>
                  <td>{item.job_role}</td>
                  <td>{item.match_score}%</td>
                  <td>{item.missing_skills}</td>
                  <td>{item.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;