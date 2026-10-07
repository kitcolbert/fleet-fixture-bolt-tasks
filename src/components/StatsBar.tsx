import { CheckCircle2, Clock, Circle, ListTodo } from 'lucide-react';

interface StatsBarProps {
  stats: { total: number; todo: number; inProgress: number; done: number };
}

export function StatsBar({ stats }: StatsBarProps) {
  const items = [
    { label: 'Total', value: stats.total, icon: ListTodo, color: 'text-slate-600', bg: 'bg-slate-50' },
    { label: 'To Do', value: stats.todo, icon: Circle, color: 'text-slate-500', bg: 'bg-slate-50' },
    { label: 'In Progress', value: stats.inProgress, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Done', value: stats.done, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      {items.map(({ label, value, icon: Icon, color, bg }) => (
        <div
          key={label}
          className={`flex items-center gap-3 rounded-xl ${bg} border border-slate-200/60 px-4 py-3 transition-transform hover:scale-[1.02]`}
        >
          <Icon className={`w-5 h-5 ${color} shrink-0`} />
          <div className="min-w-0">
            <p className="text-xl font-bold text-slate-800 leading-none">{value}</p>
            <p className="text-xs text-slate-500 mt-1 truncate">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
