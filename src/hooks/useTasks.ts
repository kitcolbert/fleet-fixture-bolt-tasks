import { useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { FilterStatus, SortOption, Task, TaskStatus } from '@/types';

const STORAGE_KEY = 'task-tracker:tasks';

function createId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(STORAGE_KEY, []);

  const addTask = useCallback(
    (title: string, dueDate: string, status: TaskStatus = 'todo') => {
      const trimmed = title.trim();
      if (!trimmed) return;
      setTasks((prev) => [
        { id: createId(), title: trimmed, dueDate, status, createdAt: Date.now() },
        ...prev,
      ]);
    },
    [setTasks],
  );

  const updateTask = useCallback(
    (id: string, patch: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...patch } : t)),
      );
    },
    [setTasks],
  );

  const deleteTask = useCallback(
    (id: string) => {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    },
    [setTasks],
  );

  const toggleDone = useCallback(
    (id: string) => {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, status: t.status === 'done' ? 'todo' : 'done' } : t,
        ),
      );
    },
    [setTasks],
  );

  const clearCompleted = useCallback(() => {
    setTasks((prev) => prev.filter((t) => t.status !== 'done'));
  }, [setTasks]);

  const stats = useMemo(
    () => ({
      total: tasks.length,
      todo: tasks.filter((t) => t.status === 'todo').length,
      inProgress: tasks.filter((t) => t.status === 'in-progress').length,
      done: tasks.filter((t) => t.status === 'done').length,
    }),
    [tasks],
  );

  const getFilteredSorted = useCallback(
    (filter: FilterStatus, sort: SortOption, query: string) => {
      let list = tasks;
      if (filter !== 'all') list = list.filter((t) => t.status === filter);
      if (query.trim()) {
        const q = query.trim().toLowerCase();
        list = list.filter((t) => t.title.toLowerCase().includes(q));
      }
      const sorted = [...list];
      sorted.sort((a, b) => {
        if (sort === 'title') return a.title.localeCompare(b.title);
        if (sort === 'createdAt') return b.createdAt - a.createdAt;
        // dueDate ascending; empty due dates last
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.localeCompare(b.dueDate);
      });
      return sorted;
    },
    [tasks],
  );

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleDone,
    clearCompleted,
    stats,
    getFilteredSorted,
  };
}
