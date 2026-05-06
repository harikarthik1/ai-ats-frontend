import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Upload, Clock, User, ArrowRight, Zap } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();

  const cards = [
    {
      to: '/upload',
      icon: Upload,
      color: 'sky',
      title: 'Upload Resume',
      desc: 'Upload a PDF or DOCX and get instant AI analysis.',
      cta: 'Upload now',
    },
    {
      to: '/history',
      icon: Clock,
      color: 'emerald',
      title: 'Analysis History',
      desc: 'Review all your previous resume analyses.',
      cta: 'View history',
    },
  ];

  const colorMap: Record<string, string> = {
    sky: 'bg-sky-50 border-sky-100 hover:border-sky-300',
    emerald: 'bg-emerald-50 border-emerald-100 hover:border-emerald-300',
  };
  const iconMap: Record<string, string> = {
    sky: 'bg-sky-100 text-sky-600',
    emerald: 'bg-emerald-100 text-emerald-600',
  };
  const ctaMap: Record<string, string> = {
    sky: 'text-sky-600',
    emerald: 'text-emerald-600',
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Profile strip */}
      <div className="bg-gradient-to-r from-sky-600 to-sky-500 rounded-2xl p-6 sm:p-8 text-white mb-8 shadow-lg shadow-sky-100 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
          <User size={26} className="text-white" />
        </div>
        <div>
          <p className="text-sky-100 text-sm">Welcome back,</p>
          <h1 className="text-2xl font-bold">{user?.email}</h1>
        </div>
        <Link
          to="/upload"
          className="sm:ml-auto flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all"
        >
          <Zap size={15} /> Analyze Resume
        </Link>
      </div>

      {/* Quick-access cards */}
      <h2 className="text-lg font-semibold text-slate-700 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {cards.map(({ to, icon: Icon, color, title, desc, cta }) => (
          <Link
            key={to}
            to={to}
            className={`group rounded-2xl border p-6 transition-all hover:shadow-md ${colorMap[color]}`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${iconMap[color]}`}>
              <Icon size={20} />
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">{title}</h3>
            <p className="text-sm text-slate-500 mb-4">{desc}</p>
            <span className={`flex items-center gap-1 text-sm font-medium ${ctaMap[color]}`}>
              {cta} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        ))}
      </div>

      {/* Tip */}
      <div className="mt-8 bg-amber-50 border border-amber-100 rounded-2xl px-6 py-5">
        <p className="text-sm text-amber-800">
          <span className="font-semibold">Tip:</span> Upload the latest version of your resume for the most accurate AI analysis and job-match recommendations.
        </p>
      </div>
    </div>
  );
}
