import { useEffect, useState } from "react";
import API from "../../services/api";
import Navbar from "../../components/Navbar";
import "./index.css";

function Dashboard() {
  const [resumeCount, setResumeCount] = useState(0);
  const [analysisCount, setAnalysisCount] = useState(0);
  const [latestScore, setLatestScore] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const resumes = await API.get("/api/resume/my-resumes");
      const history = await API.get("/api/analysis/my-history");

      setResumeCount(resumes.data.length);
      setAnalysisCount(history.data.length);

      if (history.data.length > 0) {
        setLatestScore(history.data[history.data.length - 1].finalScore);
      }
    } catch (err) {
      console.error("Dashboard data failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Overview of your resume analytics</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Resumes</h3>
            <p>{resumeCount}</p>
          </div>

          <div className="stat-card">
            <h3>Total Analyses</h3>
            <p>{analysisCount}</p>
          </div>

          <div className="stat-card">
            <h3>Latest Score</h3>
            <p>
              {latestScore !== null ? `${latestScore}%` : "No Analysis Yet"}
            </p>
          </div>
        </div>

        <div className="dashboard-actions">
          <div className="action-card">
            <h3>Upload Resume</h3>
            <p>Add new resume for analysis.</p>
          </div>

          <div className="action-card">
            <h3>Analyze Resume</h3>
            <p>Compare resume with job description.</p>
          </div>

          <div className="action-card">
            <h3>View History</h3>
            <p>See previous analysis results.</p>
          </div>
        </div>
      </div>
  </>
  );
}

export default Dashboard;