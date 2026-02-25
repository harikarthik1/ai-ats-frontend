import { useEffect, useState } from "react";
import API from "../../services/api";
import Navbar from "../../components/Navbar";
import ScoreCard from "../../components/ScoreCard";
import SuggestionsPanel from "../../components/SuggestionsPanel";
import HistoryTable from "../../components/HistoryTable";
import "./index.css";

function Analyze() {
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchResumes();
    fetchHistory();
  }, []);

  const fetchResumes = async () => {
    try {
      const res = await API.get("/api/resume/my-resumes");
      setResumes(res.data);
    } catch {
      console.error("Failed to fetch resumes");
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await API.get("/api/analysis/my-history");
      setHistory(res.data);
    } catch {
      console.error("Failed to fetch history");
    }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();

    if (!selectedResume || !jobDescription) {
      alert("Please select resume and paste job description");
      return;
    }

    try {
      const res = await API.post("/api/analysis/analyze", {
        resumeId: selectedResume,
        jobDescription,
      });

      setResult(res.data);
      fetchHistory();
    } catch {
      alert("Analysis failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="analyze-container">
        <div className="analyze-header">
          <h1>Analyze Resume</h1>
          <p>Compare your resume with a job description using AI</p>
        </div>

        <form onSubmit={handleAnalyze} className="analyze-form">
          <select
            value={selectedResume}
            onChange={(e) => setSelectedResume(e.target.value)}
          >
            <option value="">Select Resume</option>
            {resumes.map((resume) => (
              <option key={resume.id} value={resume.id}>
                {resume.fileName}
              </option>
            ))}
          </select>

          <textarea
            placeholder="Paste Job Description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />

          <button type="submit">Analyze</button>
        </form>

        {result && (
          <div className="analysis-results">
            <ScoreCard
              finalScore={result.finalScore}
              semanticScore={result.semanticScore}
              keywordScore={result.keywordScore}
            />

            <SuggestionsPanel
              matched={result.matchedKeywords}
              missing={result.missingKeywords}
              aiMissing={result.aiMissingSkills}
              suggestions={result.aiSuggestions}
            />
          </div>
        )}

        <div className="history-section">
          <h2>Analysis History</h2>
          <HistoryTable history={history} />
        </div>
      </div>
    </>
  );
}

export default Analyze;