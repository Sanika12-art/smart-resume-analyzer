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
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc, #e2e8f0)",
        padding: "40px 20px",
        fontFamily: "Segoe UI, Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          padding: "40px",
        }}
      >
        <div style={{ marginBottom: "30px", textAlign: "center" }}>
          <h1
            style={{
              margin: 0,
              fontSize: "42px",
              color: "#0f172a",
              fontWeight: "700",
            }}
          >
            Smart Resume Analyzer
          </h1>
          <p
            style={{
              marginTop: "12px",
              color: "#475569",
              fontSize: "17px",
            }}
          >
            Upload a resume, analyze skills, and view matching history
          </p>
        </div>

        <div
          style={{
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            padding: "25px",
            marginBottom: "30px",
          }}
        >
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#1e293b",
                }}
              >
                Select Job Role
              </label>
              <select
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #cbd5e1",
                  fontSize: "15px",
                  outline: "none",
                }}
              >
                <option value="">-- Select Role --</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="AI Engineer">AI Engineer</option>
                <option value="Web Developer">Web Developer</option>
              </select>
            </div>

            <div style={{ marginBottom: "22px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#1e293b",
                }}
              >
                Upload Resume (PDF)
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setResume(e.target.files[0])}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  background: "#fff",
                  border: "1px solid #cbd5e1",
                  borderRadius: "10px",
                }}
              />
            </div>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button
                type="submit"
                style={{
                  background: "#0f172a",
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  padding: "12px 22px",
                  fontSize: "15px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Analyze Resume
              </button>

              <button
                type="button"
                onClick={loadHistory}
                style={{
                  background: "#e2e8f0",
                  color: "#0f172a",
                  border: "none",
                  borderRadius: "10px",
                  padding: "12px 22px",
                  fontSize: "15px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                View History
              </button>
            </div>
          </form>
        </div>

        {result && (
          <div
            style={{
              marginTop: "10px",
              marginBottom: "30px",
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "16px",
              padding: "25px",
              boxShadow: "0 4px 14px rgba(0,0,0,0.04)",
            }}
          >
            <h2
              style={{
                marginTop: 0,
                marginBottom: "20px",
                color: "#0f172a",
                fontSize: "28px",
              }}
            >
              Analysis Result
            </h2>

            <div style={{ display: "grid", gap: "12px" }}>
              <p style={{ margin: 0 }}><strong>File Name:</strong> {result.filename}</p>
              <p style={{ margin: 0 }}><strong>Job Role:</strong> {result.job_role}</p>
              <p style={{ margin: 0 }}><strong>Match Score:</strong> {result.match_score}%</p>
              <p style={{ margin: 0 }}>
                <strong>Found Skills:</strong> {result.found_skills?.join(", ") || "None"}
              </p>
              <p style={{ margin: 0 }}>
                <strong>Missing Skills:</strong> {result.missing_skills?.join(", ") || "None"}
              </p>
            </div>
          </div>
        )}

        {history.length > 0 && (
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "16px",
              padding: "25px",
              boxShadow: "0 4px 14px rgba(0,0,0,0.04)",
              overflowX: "auto",
            }}
          >
            <h2
              style={{
                marginTop: 0,
                marginBottom: "20px",
                color: "#0f172a",
                fontSize: "28px",
              }}
            >
              Upload History
            </h2>

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: "700px",
              }}
            >
              <thead>
                <tr style={{ background: "#f1f5f9" }}>
                  <th style={thStyle}>File Name</th>
                  <th style={thStyle}>Role</th>
                  <th style={thStyle}>Score</th>
                  <th style={thStyle}>Missing Skills</th>
                  <th style={thStyle}>Date</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, index) => (
                  <tr
                    key={item.id}
                    style={{
                      background: index % 2 === 0 ? "#ffffff" : "#f8fafc",
                    }}
                  >
                    <td style={tdStyle}>{item.filename}</td>
                    <td style={tdStyle}>{item.job_role}</td>
                    <td style={tdStyle}>{item.match_score}%</td>
                    <td style={tdStyle}>{item.missing_skills}</td>
                    <td style={tdStyle}>{item.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

const thStyle = {
  padding: "14px",
  textAlign: "left",
  color: "#0f172a",
  borderBottom: "1px solid #cbd5e1",
  fontSize: "15px",
};

const tdStyle = {
  padding: "14px",
  borderBottom: "1px solid #e2e8f0",
  color: "#334155",
  fontSize: "14px",
};

export default App;