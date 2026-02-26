import { useState } from 'react';
import { PlusCircle } from 'lucide-react';

const defaultForm = {
  title: '',
  description: '',
  dueDate: '',
  priority: 'Medium',
};

const TodoForm = ({ onSubmit }) => {
  const [form, setForm] = useState(defaultForm);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.title.trim()) return;
    onSubmit({ ...form, title: form.title.trim() });
    setForm(defaultForm);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-4 shadow-soft dark:bg-slate-900 md:p-5">
      <div className="grid gap-3 md:grid-cols-2">
        <input
          value={form.title}
          onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
          placeholder="Task title"
          className="rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800"
        />
        <input
          type="date"
          value={form.dueDate}
          onChange={(e) => setForm((prev) => ({ ...prev, dueDate: e.target.value }))}
          className="rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800"
        />
        <select
          value={form.priority}
          onChange={(e) => setForm((prev) => ({ ...prev, priority: e.target.value }))}
          className="rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <button className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:scale-[1.02] hover:bg-indigo-700">
          <PlusCircle size={18} /> Add Task
        </button>
      </div>
      <textarea
        value={form.description}
        onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
        rows={2}
        placeholder="Task details"
        className="mt-3 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800"
      />
    </form>
  );
};

export default TodoForm;
