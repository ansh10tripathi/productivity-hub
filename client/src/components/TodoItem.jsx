import { useState } from 'react';
import { CalendarDays, Pencil, Trash2, GripVertical, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const TodoItem = ({ todo, onDelete, onToggle, onUpdate, onDragStart, onDrop }) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({
    title: todo.title,
    description: todo.description,
    dueDate: todo.dueDate ? todo.dueDate.slice(0, 10) : '',
    priority: todo.priority,
  });

  const handleSave = () => {
    onUpdate(todo._id, draft);
    setEditing(false);
  };

  const priorityClasses = {
    Low: 'bg-emerald-100 text-emerald-700',
    Medium: 'bg-amber-100 text-amber-700',
    High: 'bg-rose-100 text-rose-700',
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      draggable
      onDragStart={() => onDragStart(todo._id)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDrop(todo._id)}
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft transition hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-900"
    >
      <div className="flex items-start justify-between gap-3">
        <button onClick={() => onToggle(todo._id)} className="mt-1 rounded-full border p-1">
          {todo.completed ? <Check size={14} className="text-emerald-600" /> : <span className="block h-3 w-3" />}
        </button>

        <div className="flex-1">
          {editing ? (
            <div className="space-y-2">
              <input
                className="w-full rounded-lg border px-2 py-1 dark:bg-slate-800"
                value={draft.title}
                onChange={(e) => setDraft((p) => ({ ...p, title: e.target.value }))}
              />
              <textarea
                rows={2}
                className="w-full rounded-lg border px-2 py-1 dark:bg-slate-800"
                value={draft.description}
                onChange={(e) => setDraft((p) => ({ ...p, description: e.target.value }))}
              />
              <div className="flex gap-2">
                <input
                  type="date"
                  className="rounded-lg border px-2 py-1 dark:bg-slate-800"
                  value={draft.dueDate}
                  onChange={(e) => setDraft((p) => ({ ...p, dueDate: e.target.value }))}
                />
                <select
                  className="rounded-lg border px-2 py-1 dark:bg-slate-800"
                  value={draft.priority}
                  onChange={(e) => setDraft((p) => ({ ...p, priority: e.target.value }))}
                >
                  <option>Low</option><option>Medium</option><option>High</option>
                </select>
                <button onClick={handleSave} className="rounded-lg bg-indigo-600 px-3 py-1 text-white">Save</button>
              </div>
            </div>
          ) : (
            <>
              <h3 className={`font-semibold ${todo.completed ? 'line-through text-slate-400' : ''}`}>{todo.title}</h3>
              {todo.description && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{todo.description}</p>}
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                <span className={`rounded-full px-2 py-1 font-medium ${priorityClasses[todo.priority]}`}>{todo.priority}</span>
                <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  <CalendarDays size={12} /> {todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : 'No date'}
                </span>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-1 text-slate-400">
          <GripVertical size={16} />
          <button onClick={() => setEditing((v) => !v)} className="rounded p-1 hover:bg-slate-100 dark:hover:bg-slate-800"><Pencil size={15} /></button>
          <button onClick={() => onDelete(todo._id)} className="rounded p-1 hover:bg-slate-100 dark:hover:bg-slate-800"><Trash2 size={15} /></button>
        </div>
      </div>
    </motion.article>
  );
};

export default TodoItem;
