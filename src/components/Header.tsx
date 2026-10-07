import { CheckSquare } from 'lucide-react';

export function Header() {
  return (
    <header className="flex items-center gap-3 mb-8">
      <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-lg shadow-blue-500/20">
        <CheckSquare className="w-6 h-6" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Task Tracker</h1>
        <p className="text-sm text-slate-500">Stay on top of what matters</p>
      </div>
    </header>
  );
}
