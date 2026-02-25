import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import API from "../../services/api";
import "./index.css";

function Upload() {
  const [file, setFile] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const res = await API.get("/api/resume/my-resumes");
      setResumes(res.data);
    } catch {
      console.error("Failed to fetch resumes");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) return alert("Select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      await API.post("/api/resume/upload", formData);
      setMessage("Resume uploaded successfully");
      setFile(null);
      fetchResumes();
    } catch {
      setMessage("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resume?"))
      return;

    try {
      await API.delete(`/api/resume/${id}`);
      fetchResumes();
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <>
    <Navbar />
      <div className="upload-container">
        <h1>Manage Resumes</h1>

        <form className="upload-form" onSubmit={handleUpload}>
          <label className="file-box">
            {file ? file.name : "Click to select PDF or DOCX file"}
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFile(e.target.files[0])}
              hidden
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload Resume"}
          </button>
        </form>

        {message && <div className="upload-message">{message}</div>}

        <div className="resume-list">
          <h2>Your Resumes</h2>

          {resumes.map((resume) => (
            <div key={resume.id} className="resume-item">
              <span>{resume.fileName}</span>
              <button
                className="delete-btn"
                onClick={() => handleDelete(resume.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Upload;