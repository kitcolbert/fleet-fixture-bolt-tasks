import { Check, Trash2, Calendar, Pencil, X } from 'lucide-react';
import { useState } from 'react';
import type { Task, TaskStatus } from '@/types';
import { STATUS_META } from '@/types';

interface TaskItemProps {
  task: Task;
  onToggleDone: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, patch: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
}

function formatDueDate(iso: string): { text: string; isOverdue: boolean; isSoon: boolean } {
  if (!iso) return { text: 'No due date', isOverdue: false, isSoon: false };
  const due = new Date(iso + 'T00:00:00');
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const diffMs = due.getTime() - now.getTime();
  const diffDays = Math.round(diffMs / 86_400_000);

  const text = due.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  const isOverdue = diffDays < 0;
  const isSoon = diffDays >= 0 && diffDays <= 2;
  return { text, isOverdue, isSoon };
}

export function TaskItem({ task, onToggleDone, onDelete, onUpdate }: TaskItemProps) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDue, setEditDue] = useState(task.dueDate);
  const [editStatus, setEditStatus] = useState<TaskStatus>(task.status);

  const meta = STATUS_META[task.status];
  const { text: dueText, isOverdue, isSoon } = formatDueDate(task.dueDate);
  const isDone = task.status === 'done';

  const saveEdit = () => {
    onUpdate(task.id, { title: editTitle.trim() || task.title, dueDate: editDue, status: editStatus });
    setEditing(false);
  };

  const cancelEdit = () => {
    setEditTitle(task.title);
    setEditDue(task.dueDate);
    setEditStatus(task.status);
    setEditing(false);
  };

  return (
    <li
      className={`group rounded-xl bg-white border border-slate-200 border-l-4 ${meta.accentClass} p-4 shadow-sm transition-all hover:shadow-md`}
    >
      {editing ? (
        <div className="space-y-3">
          <input
            autoFocus
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
          />
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="date"
              value={editDue}
              onChange={(e) => setEditDue(e.target.value)}
              className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
            />
            <select
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value as TaskStatus)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
            >
              {(Object.keys(STATUS_META) as TaskStatus[]).map((s) => (
                <option key={s} value={s}>{STATUS_META[s].label}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={cancelEdit} className="px-3 py-1.5 rounded-lg text-slate-600 text-sm font-medium hover:bg-slate-100 transition">
              <X className="w-4 h-4 inline -mt-0.5" /> Cancel
            </button>
            <button onClick={saveEdit} className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition">
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-3">
          <button
            onClick={() => onToggleDone(task.id)}
            className={`mt-0.5 shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
              isDone
                ? 'bg-emerald-500 border-emerald-500 text-white'
                : 'border-slate-300 text-transparent hover:border-emerald-400'
            }`}
            aria-label={isDone ? 'Mark as not done' : 'Mark as done'}
          >
            <Check className="w-3.5 h-3.5" />
          </button>

          <div className="min-w-0 flex-1">
            <p className={`font-medium text-slate-800 break-words ${isDone ? 'line-through text-slate-400' : ''}`}>
              {task.title}
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-1.5">
              <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${meta.badgeClass}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${meta.dotClass}`} />
                {meta.label}
              </span>
              <span
                className={`inline-flex items-center gap-1 text-xs ${
                  isOverdue ? 'text-red-500 font-medium' : isSoon ? 'text-amber-500 font-medium' : 'text-slate-400'
                }`}
              >
                <Calendar className="w-3 h-3" />
                {dueText}
                {isOverdue && ' · Overdue'}
                {isSoon && !isOverdue && ' · Soon'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setEditing(true)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              aria-label="Edit task"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
              aria-label="Delete task"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </li>
  );
}
