import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./index.css";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="nav-left">
        <h2 className="logo">ATS</h2>
      </div>

      <div className={`nav-center ${menuOpen ? "active" : ""}`}>
        <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
        <NavLink to="/upload" className="nav-link">Upload</NavLink>
        <NavLink to="/analyze" className="nav-link">Analyze</NavLink>
      </div>

      <div className="nav-right">
        <button onClick={logout}>Logout</button>
      </div>

      <div
        className={`menu-toggle ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

export default Navbar;