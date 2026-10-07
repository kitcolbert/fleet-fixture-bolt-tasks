export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  dueDate: string; // ISO date string (yyyy-mm-dd)
  status: TaskStatus;
  createdAt: number;
}

export type FilterStatus = 'all' | TaskStatus;
export type SortOption = 'dueDate' | 'createdAt' | 'title';

export const STATUS_META: Record<
  TaskStatus,
  { label: string; dotClass: string; badgeClass: string; accentClass: string }
> = {
  todo: {
    label: 'To Do',
    dotClass: 'bg-slate-400',
    badgeClass: 'bg-slate-100 text-slate-600 border-slate-200',
    accentClass: 'border-l-slate-300',
  },
  'in-progress': {
    label: 'In Progress',
    dotClass: 'bg-amber-400',
    badgeClass: 'bg-amber-50 text-amber-600 border-amber-200',
    accentClass: 'border-l-amber-400',
  },
  done: {
    label: 'Done',
    dotClass: 'bg-emerald-400',
    badgeClass: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    accentClass: 'border-l-emerald-400',
  },
};
