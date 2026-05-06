import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FileText, LogOut, LayoutDashboard, Upload, Clock } from 'lucide-react';

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLink = (to: string, label: string, Icon: React.ElementType) => (
    <Link
      to={to}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
        pathname === to
          ? 'bg-sky-100 text-sky-700'
          : 'text-slate-600 hover:text-sky-700 hover:bg-sky-50'
      }`}
    >
      <Icon size={15} />
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-2 font-bold text-slate-800">
          <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center">
            <FileText size={16} className="text-white" />
          </div>
          ResumeAI
        </Link>

        {isAuthenticated && (
          <nav className="hidden sm:flex items-center gap-1">
            {navLink('/dashboard', 'Dashboard', LayoutDashboard)}
            {navLink('/upload', 'Upload', Upload)}
            {navLink('/history', 'History', Clock)}
          </nav>
        )}

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="hidden sm:block text-sm text-slate-500 truncate max-w-[180px]">{user?.email}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-red-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50"
              >
                <LogOut size={15} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-sky-700 transition-colors px-3 py-1.5">
                Login
              </Link>
              <Link to="/register" className="text-sm font-medium bg-sky-600 hover:bg-sky-700 text-white px-4 py-1.5 rounded-lg transition-colors">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>

      {isAuthenticated && (
        <div className="sm:hidden border-t border-slate-100 bg-white px-4 py-2 flex gap-2">
          {navLink('/dashboard', 'Dashboard', LayoutDashboard)}
          {navLink('/upload', 'Upload', Upload)}
          {navLink('/history', 'History', Clock)}
        </div>
      )}
    </header>
  );
}
