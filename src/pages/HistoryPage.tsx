import { useState, useEffect, useCallback } from 'react';
import { analysisApi } from '../lib/api';
import { Clock, ChevronDown, ChevronUp, Trash2, AlertCircle, Loader2, FileText, RefreshCw } from 'lucide-react';

interface HistoryItem {
  id: number;
  date: string;
  resumeName: string;
  summary: string;
}

export default function HistoryPage() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState<number | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await analysisApi.history();
      setItems(data.map((item: any) => ({
        id: item.id,
        date: item.analyzedAt,
        resumeName: item.resumeFileName,
        summary: item.summary
      })));
    } catch {
      setError('Failed to load history. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchHistory(); }, [fetchHistory]);

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this analysis? This cannot be undone.')) return;
    setDeleting(id);
    try {
      await analysisApi.deleteOne(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
      if (expanded === id) setExpanded(null);
    } catch {
      setError('Failed to delete entry. Please try again.');
    } finally {
      setDeleting(null);
    }
  };

  const toggle = (id: string) => setExpanded((prev) => (prev === id ? null : id));

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Analysis History</h1>
          <p className="text-slate-500 text-sm mt-0.5">All your past resume analyses.</p>
        </div>
        <button
          onClick={fetchHistory}
          disabled={loading}
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-sky-600 transition-colors"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-5 text-sm">
          <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20 text-slate-400">
          <Loader2 size={24} className="animate-spin mr-3" />
          Loading history…
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-20">
          <FileText size={40} className="mx-auto text-slate-200 mb-3" />
          <p className="text-slate-500 font-medium">No analyses yet.</p>
          <p className="text-slate-400 text-sm mt-1">Upload a resume to get started.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-shadow hover:shadow-md"
            >
              {/* Row header */}
              <div
                onClick={() => toggle(item.id)}
                className="flex items-center gap-3 px-5 py-4 cursor-pointer select-none"
              >
                <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center flex-shrink-0">
                  <Clock size={16} className="text-sky-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-800 truncate">{item.resumeName}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{fmt(item.date)}</p>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                    disabled={deleting === item.id}
                    className="p-1.5 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                    title="Delete"
                  >
                    {deleting === item.id
                      ? <Loader2 size={15} className="animate-spin" />
                      : <Trash2 size={15} />}
                  </button>
                  {expanded === item.id
                    ? <ChevronUp size={16} className="text-slate-400" />
                    : <ChevronDown size={16} className="text-slate-400" />}
                </div>
              </div>

              {/* Expanded detail */}
              {expanded === item.id && (
                <div className="border-t border-slate-100 px-5 py-4 bg-slate-50">
                  <p className="text-sm text-slate-600 leading-relaxed">{item.summary || 'No summary available.'}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
