import { useState } from "react";
import { PlusCircle } from "lucide-react";

const defaultForm = {
  title: "",
  description: "",
  dueDate: "",
  priority: "Medium",
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
    <form
      onSubmit={handleSubmit}
      className="
        rounded-2xl
        bg-white dark:bg-slate-900
        border border-slate-200 dark:border-slate-800
        shadow-lg
        p-6
        transition
      "
    >
      <div className="grid gap-4 md:grid-cols-2">

        <input
          value={form.title}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Task title"
          className="
            rounded-xl border border-slate-300 dark:border-slate-700
            px-4 py-2
            bg-white dark:bg-slate-800
            focus:ring-2 focus:ring-indigo-500 outline-none
            transition
          "
        />

        <input
          type="date"
          value={form.dueDate}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, dueDate: e.target.value }))
          }
          className="
            rounded-xl border border-slate-300 dark:border-slate-700
            px-4 py-2
            bg-white dark:bg-slate-800
            focus:ring-2 focus:ring-indigo-500 outline-none
          "
        />

        <select
          value={form.priority}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, priority: e.target.value }))
          }
          className="
            rounded-xl border border-slate-300 dark:border-slate-700
            px-4 py-2
            bg-white dark:bg-slate-800
            focus:ring-2 focus:ring-indigo-500 outline-none
          "
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button
          className="
            flex items-center justify-center gap-2
            rounded-xl
            bg-gradient-to-r from-indigo-600 to-purple-600
            px-4 py-2
            font-semibold text-white
            hover:scale-[1.02]
            hover:shadow-lg
            transition
          "
        >
          <PlusCircle size={18} />
          Add Task
        </button>
      </div>

      <textarea
        value={form.description}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, description: e.target.value }))
        }
        rows={3}
        placeholder="Task details"
        className="
          mt-4 w-full
          rounded-xl border border-slate-300 dark:border-slate-700
          px-4 py-2
          bg-white dark:bg-slate-800
          focus:ring-2 focus:ring-indigo-500 outline-none
        "
      />
    </form>
  );
};

export default TodoForm;