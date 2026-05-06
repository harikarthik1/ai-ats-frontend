import { FileText } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-slate-700 font-semibold">
          <FileText size={16} className="text-sky-600" />
          ResumeAI
        </div>
        <p className="text-sm text-slate-400">AI-powered resume analysis. Land your dream job faster.</p>
        <p className="text-xs text-slate-400">&copy; {new Date().getFullYear()} ResumeAI. All rights reserved.</p>
      </div>
    </footer>
  );
}
