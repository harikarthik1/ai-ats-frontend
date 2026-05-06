import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Brain, FileText, BarChart2, History } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    desc: 'Our engine extracts skills, grades your resume, and gives you actionable feedback instantly.',
  },
  {
    icon: BarChart2,
    title: 'Match Score',
    desc: 'See how well your resume matches industry expectations with a clear percentage score.',
  },
  {
    icon: History,
    title: 'Analysis History',
    desc: 'Track improvements over time with a full history of every analysis you run.',
  },
];

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-sky-50 via-white to-slate-50 py-20 sm:py-28 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block mb-4 px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-xs font-semibold tracking-wide uppercase">
            AI Resume Analysis
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight mb-5">
            Turn your resume into
            <br />
            <span className="text-sky-600">your best asset</span>
          </h1>
          <p className="text-lg text-slate-500 mb-8 max-w-xl mx-auto">
            Upload your resume and get instant AI-powered feedback — skills extraction, job-match
            scores, and personalised recommendations in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {isAuthenticated ? (
              <Link
                to="/upload"
                className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold px-7 py-3 rounded-xl shadow-lg shadow-sky-200 transition-all"
              >
                Analyze My Resume <ArrowRight size={18} />
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold px-7 py-3 rounded-xl shadow-lg shadow-sky-200 transition-all"
                >
                  Get Started Free <ArrowRight size={18} />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-sky-300 text-slate-700 font-semibold px-7 py-3 rounded-xl transition-all"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 text-center mb-12">
            Everything you need to stand out
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-sky-200 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-sky-600" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      {!isAuthenticated && (
        <section className="py-16 px-4 bg-sky-600">
          <div className="max-w-xl mx-auto text-center">
            <FileText size={36} className="text-sky-200 mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Ready to improve your resume?
            </h2>
            <p className="text-sky-100 mb-7 text-sm">
              Join thousands of job seekers who have already levelled up their resumes with ResumeAI.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-white text-sky-700 font-semibold px-7 py-3 rounded-xl hover:bg-sky-50 transition-all"
            >
              Create Free Account <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
