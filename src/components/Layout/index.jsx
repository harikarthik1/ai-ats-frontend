import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import "./index.css";

function Layout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="layout-main">
        <Topbar />
        <div className="layout-content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;