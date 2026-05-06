import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Lightbulb, Tag, BarChart2, ArrowLeft, History } from 'lucide-react';

interface Results {
  skills: string[];
  score: number;
  recommendations: string[];
}

interface LocationState {
  results?: Results;
  resumeName?: string;
}

export default function ResultsPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;
  const results = state?.results;
  const resumeName = state?.resumeName ?? 'Resume';

  if (!results) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-500 mb-4">No analysis data found for this ID.</p>
        <Link to="/history" className="text-sky-600 font-medium hover:underline">View History</Link>
      </div>
    );
  }

  const scoreColor =
    results.score >= 75 ? 'text-green-600' : results.score >= 50 ? 'text-amber-600' : 'text-red-600';
  const scoreBg =
    results.score >= 75 ? 'bg-green-50 border-green-200' : results.score >= 50 ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200';
  const scoreBar =
    results.score >= 75 ? 'bg-green-500' : results.score >= 50 ? 'bg-amber-500' : 'bg-red-500';

  const scoreLabel = results.score >= 75 ? 'Strong' : results.score >= 50 ? 'Good' : 'Needs Work';

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-6 transition-colors"
      >
        <ArrowLeft size={15} /> Back
      </button>

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Analysis Results</h1>
          <p className="text-slate-400 text-sm mt-0.5">ID: {id} · {resumeName}</p>
        </div>
        <Link
          to="/history"
          className="flex items-center gap-1.5 text-sm text-sky-600 hover:text-sky-800 font-medium"
        >
          <History size={14} /> View History
        </Link>
      </div>

      {/* Score card */}
      <div className={`rounded-2xl border p-6 mb-6 ${scoreBg}`}>
        <div className="flex items-center gap-3 mb-3">
          <BarChart2 size={20} className={scoreColor} />
          <h2 className="font-semibold text-slate-800">Match Score</h2>
          <span className={`ml-auto text-3xl font-extrabold ${scoreColor}`}>{results.score}%</span>
        </div>
        <div className="h-3 bg-white/60 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${scoreBar}`}
            style={{ width: `${results.score}%` }}
          />
        </div>
        <p className={`text-sm mt-2 font-medium ${scoreColor}`}>{scoreLabel}</p>
      </div>

      {/* Skills */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Tag size={18} className="text-sky-600" />
          <h2 className="font-semibold text-slate-800">Extracted Skills</h2>
          <span className="ml-auto text-xs text-slate-400">{results.skills.length} found</span>
        </div>
        {results.skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {results.skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-sky-50 border border-sky-100 text-sky-700 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400">No skills detected.</p>
        )}
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb size={18} className="text-amber-500" />
          <h2 className="font-semibold text-slate-800">Recommendations</h2>
        </div>
        {results.recommendations.length > 0 ? (
          <ul className="space-y-3">
            {results.recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                <CheckCircle size={15} className="text-green-500 mt-0.5 flex-shrink-0" />
                {rec}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-400">No recommendations at this time.</p>
        )}
      </div>
    </div>
  );
}
