import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { resumeApi, analysisApi } from '../lib/api';
import { Upload, FileText, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

type Stage = 'idle' | 'uploading' | 'analyzing' | 'done' | 'error';

export default function UploadPage() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [drag, setDrag] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<Stage>('idle');
  const [error, setError] = useState('');

  const accept = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  const acceptExt = ['.pdf', '.docx'];

  const isValid = (f: File) => accept.includes(f.type) || acceptExt.some((ext) => f.name.endsWith(ext));

  const pickFile = (f: File) => {
    if (!isValid(f)) { setError('Only PDF or DOCX files are accepted.'); return; }
    setError('');
    setFile(f);
    setStage('idle');
    setProgress(0);
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDrag(false);
    const f = e.dataTransfer.files[0];
    if (f) pickFile(f);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) pickFile(f);
    e.target.value = '';
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setError('');
    setStage('uploading');
    setProgress(0);
    try {
      const { data: uploadData } = await resumeApi.upload(file, setProgress);
      setStage('analyzing');
      const { data: analysisData } = await analysisApi.analyze(uploadData.resumeId);
      setStage('done');
      setTimeout(() => navigate(`/results/${analysisData.analysisId}`, { state: { results: { skills: analysisData.skills, score: analysisData.score, recommendations: analysisData.recommendations }, resumeName: file.name } }), 600);
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Something went wrong. Please try again.';
      setError(message);
      setStage('error');
    }
  };

  const stageLabel: Record<Stage, string> = {
    idle: 'Analyze Resume',
    uploading: 'Uploading…',
    analyzing: 'Analyzing…',
    done: 'Done!',
    error: 'Try Again',
  };

  const busy = stage === 'uploading' || stage === 'analyzing';

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Upload Resume</h1>
      <p className="text-slate-500 text-sm mb-8">Upload a PDF or DOCX to receive an AI-powered analysis.</p>

      {/* Drop zone */}
      <div
        onClick={() => !busy && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={onDrop}
        className={`relative rounded-2xl border-2 border-dashed p-10 text-center transition-all cursor-pointer select-none
          ${drag ? 'border-sky-400 bg-sky-50' : 'border-slate-200 hover:border-sky-300 hover:bg-slate-50'}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx"
          className="hidden"
          onChange={onChange}
        />
        {file ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-sky-100 flex items-center justify-center">
              <FileText size={28} className="text-sky-600" />
            </div>
            <div>
              <p className="font-semibold text-slate-800">{file.name}</p>
              <p className="text-xs text-slate-400 mt-0.5">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
            {!busy && (
              <button
                onClick={(e) => { e.stopPropagation(); setFile(null); setStage('idle'); setProgress(0); }}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-red-500 transition-colors"
              >
                <X size={13} /> Remove file
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
              <Upload size={26} className="text-slate-400" />
            </div>
            <div>
              <p className="font-medium text-slate-700">Drop your resume here</p>
              <p className="text-xs text-slate-400 mt-1">PDF or DOCX — click to browse</p>
            </div>
          </div>
        )}
      </div>

      {/* Progress bar */}
      {busy && (
        <div className="mt-5">
          <div className="flex justify-between text-xs text-slate-500 mb-1.5">
            <span>{stage === 'uploading' ? 'Uploading file…' : 'Running AI analysis…'}</span>
            {stage === 'uploading' && <span>{progress}%</span>}
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-sky-500 rounded-full transition-all duration-300"
              style={{ width: stage === 'uploading' ? `${progress}%` : '100%' }}
            />
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-start gap-2 mt-4 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
          <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Success flash */}
      {stage === 'done' && (
        <div className="flex items-center gap-2 mt-4 bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 text-sm">
          <CheckCircle size={16} className="flex-shrink-0" />
          Analysis complete! Redirecting to results…
        </div>
      )}

      {/* Action button */}
      <button
        onClick={handleAnalyze}
        disabled={!file || busy || stage === 'done'}
        className="mt-6 w-full flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors"
      >
        {busy && <Loader2 size={16} className="animate-spin" />}
        {stageLabel[stage]}
      </button>
    </div>
  );
}
