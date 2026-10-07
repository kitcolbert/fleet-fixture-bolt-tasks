import { ClipboardList, Trash2 } from 'lucide-react';
import type { Task } from '@/types';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggleDone: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, patch: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
  onClearCompleted: () => void;
  hasCompleted: boolean;
}

export function TaskList({
  tasks,
  onToggleDone,
  onDelete,
  onUpdate,
  onClearCompleted,
  hasCompleted,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
          <ClipboardList className="w-7 h-7 text-slate-400" />
        </div>
        <p className="text-slate-500 font-medium">No tasks here</p>
        <p className="text-sm text-slate-400 mt-1">Add a task or adjust your filters to get started.</p>
      </div>
    );
  }

  return (
    <div>
      {hasCompleted && (
        <div className="flex justify-end mb-3">
          <button
            onClick={onClearCompleted}
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-red-600 font-medium transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear completed
          </button>
        </div>
      )}
      <ul className="space-y-2.5">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleDone={onToggleDone}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </ul>
    </div>
  );
}
