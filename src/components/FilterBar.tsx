import { Search, Filter } from 'lucide-react';
import type { FilterStatus, SortOption, TaskStatus } from '@/types';

interface FilterBarProps {
  filter: FilterStatus;
  setFilter: (f: FilterStatus) => void;
  sort: SortOption;
  setSort: (s: SortOption) => void;
  query: string;
  setQuery: (q: string) => void;
  counts: Record<FilterStatus, number>;
}

const FILTER_OPTIONS: { value: FilterStatus; label: string; dotClass?: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'todo', label: 'To Do', dotClass: 'bg-slate-400' },
  { value: 'in-progress', label: 'In Progress', dotClass: 'bg-amber-400' },
  { value: 'done', label: 'Done', dotClass: 'bg-emerald-400' },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'dueDate', label: 'Due date' },
  { value: 'createdAt', label: 'Recently added' },
  { value: 'title', label: 'Title (A–Z)' },
];

export function FilterBar({ filter, setFilter, sort, setSort, query, setQuery, counts }: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3 mb-5">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tasks..."
          className="w-full rounded-lg border border-slate-300 pl-9 pr-3 py-2 text-sm text-slate-800 placeholder-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          {FILTER_OPTIONS.map((opt) => {
            const active = filter === opt.value;
            const count = counts[opt.value];
            return (
              <button
                key={opt.value}
                onClick={() => setFilter(opt.value)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {opt.dotClass && (
                  <span
                    className={`w-2 h-2 rounded-full ${opt.dotClass} ${active ? 'ring-2 ring-white/30' : ''}`}
                  />
                )}
                {opt.label}
                {count > 0 && (
                  <span
                    className={`text-xs tabular-nums rounded-full px-1.5 ${
                      active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="sm:ml-auto flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
