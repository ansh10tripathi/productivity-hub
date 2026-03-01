import { useState } from "react";
import { CalendarDays, Pencil, Trash2, GripVertical, Check } from "lucide-react";
import { motion } from "framer-motion";

const TodoItem = ({
  todo,
  onDelete,
  onToggle,
  onUpdate,
  onDragStart,
  onDrop,
}) => {
  const [editing, setEditing] = useState(false);

  const [draft, setDraft] = useState({
    title: todo.title,
    description: todo.description,
    dueDate: todo.dueDate ? todo.dueDate.slice(0, 10) : "",
    priority: todo.priority,
  });

  const handleSave = () => {
    onUpdate(todo._id, draft);
    setEditing(false);
  };

  const priorityClasses = {
    Low: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
    Medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
    High: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400",
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      draggable
      onDragStart={() => onDragStart(todo._id)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDrop(todo._id)}
      className={`
        group rounded-2xl
        bg-white dark:bg-slate-900
        border border-slate-200 dark:border-slate-800
        shadow-md hover:shadow-xl
        transition-all duration-300
        p-5
        hover:-translate-y-1
        ${todo.completed ? "border-l-4 border-emerald-500" : ""}
      `}
    >
      <div className="flex items-start justify-between gap-4">
        
        {/* Toggle Button */}
        <button
          onClick={() => onToggle(todo._id)}
          className="
            mt-1 rounded-full border-2 
            border-slate-300 dark:border-slate-600
            p-1 transition
            hover:border-emerald-500
          "
        >
          {todo.completed ? (
            <Check size={14} className="text-emerald-600" />
          ) : (
            <span className="block h-3 w-3" />
          )}
        </button>

        {/* Content */}
        <div className="flex-1">
          {editing ? (
            <div className="space-y-3">
              <input
                className="w-full rounded-lg border border-slate-300 bg-white text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={draft.title}
                onChange={(e) =>
                  setDraft((p) => ({ ...p, title: e.target.value }))
                }
              />
              <textarea
                rows={2}
                className="w-full rounded-lg border border-slate-300 bg-white text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={draft.description}
                onChange={(e) =>
                  setDraft((p) => ({ ...p, description: e.target.value }))
                }
              />
              <div className="flex gap-2 flex-wrap">
                <input
                  type="date"
                  className="rounded-lg border border-slate-300 bg-white text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={draft.dueDate}
                  onChange={(e) =>
                    setDraft((p) => ({ ...p, dueDate: e.target.value }))
                  }
                />
                <select
                  className="rounded-lg border border-slate-300 bg-white text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={draft.priority}
                  onChange={(e) =>
                    setDraft((p) => ({ ...p, priority: e.target.value }))
                  }
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
                <button
                  onClick={handleSave}
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-700 transition"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <>
              <h3
                className={`text-lg font-semibold transition
                  ${
                    todo.completed
                      ? "line-through text-slate-500 dark:text-slate-400"
                      : "text-slate-800 dark:text-slate-100 group-hover:text-indigo-600"
                  }`}
              >
                {todo.title}
              </h3>

              {todo.description && (
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  {todo.description}
                </p>
              )}

              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                <span
                  className={`rounded-full px-3 py-1 font-medium ${priorityClasses[todo.priority]}`}
                >
                  {todo.priority}
                </span>

                <span className="flex items-center gap-1 rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-slate-600 dark:text-slate-300">
                  <CalendarDays size={12} />
                  {todo.dueDate
                    ? new Date(todo.dueDate).toLocaleDateString()
                    : "No date"}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 text-slate-400">
          <GripVertical size={16} className="cursor-grab" />
          <button
            onClick={() => setEditing((v) => !v)}
            className="rounded p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => onDelete(todo._id)}
            className="rounded p-2 hover:bg-rose-100 dark:hover:bg-rose-900/40 hover:text-rose-600 transition"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </motion.article>
  );
};

export default TodoItem;