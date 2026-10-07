import { useState } from 'react';
import { Header } from '@/components/Header';
import { StatsBar } from '@/components/StatsBar';
import { TaskForm } from '@/components/TaskForm';
import { FilterBar } from '@/components/FilterBar';
import { TaskList } from '@/components/TaskList';
import { useTasks } from '@/hooks/useTasks';
import type { FilterStatus, SortOption } from '@/types';

function App() {
  const {
    addTask,
    updateTask,
    deleteTask,
    toggleDone,
    clearCompleted,
    stats,
    getFilteredSorted,
  } = useTasks();

  const [filter, setFilter] = useState<FilterStatus>('all');
  const [sort, setSort] = useState<SortOption>('dueDate');
  const [query, setQuery] = useState('');

  const visibleTasks = getFilteredSorted(filter, sort, query);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-2xl mx-auto px-4 py-10 sm:py-14">
        <Header />
        <StatsBar stats={stats} />
        <TaskForm onAdd={addTask} />
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          sort={sort}
          setSort={setSort}
          query={query}
          setQuery={setQuery}
          counts={{
            all: stats.total,
            todo: stats.todo,
            'in-progress': stats.inProgress,
            done: stats.done,
          }}
        />
        <TaskList
          tasks={visibleTasks}
          onToggleDone={toggleDone}
          onDelete={deleteTask}
          onUpdate={updateTask}
          onClearCompleted={clearCompleted}
          hasCompleted={stats.done > 0}
        />
        <footer className="mt-12 text-center text-xs text-slate-400">
          Your tasks are saved locally in your browser.
        </footer>
      </div>
    </div>
  );
}

export default App;
