import { useRef, useState } from "react";
import { PlusCircle, CalendarDays } from "lucide-react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

const defaultForm = {
  title: "",
  description: "",
  dueDate: null,
  priority: "Medium",
};

const TodoForm = ({ onSubmit }) => {
  const [form, setForm] = useState(defaultForm);
  const dateRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.title.trim()) return;

    onSubmit({
      ...form,
      title: form.title.trim(),
      dueDate: form.dueDate
        ? format(form.dueDate, "yyyy-MM-dd")
        : "",
    });

    setForm(defaultForm);
  };

  const inputStyle =
    "w-full rounded-xl px-4 py-3 border border-slate-300 bg-white text-slate-900 " +
    "placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 " +
    "transition duration-200 " +
    "dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 " +
    "dark:placeholder:text-slate-500";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white dark:bg-slate-900 p-6 
                 border border-slate-200 dark:border-slate-700 
                 shadow-md space-y-6"
    >
      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">

        {/* Title - 50% */}
        <div className="md:col-span-7">
          <input
            value={form.title}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="Task title"
            className={`${inputStyle} h-[48px]`}
          />
        </div>

        {/* Priority - 25% */}
        <div className="md:col-span-3">
          <select
            value={form.priority}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, priority: e.target.value }))
            }
            className={`${inputStyle} h-[48px]`}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        {/* Due Date - 25% */}
        <div className="md:col-span-2 relative">
          <DatePicker
            ref={dateRef}
            selected={form.dueDate}
            onChange={(date) =>
              setForm((prev) => ({ ...prev, dueDate: date }))
            }
            dateFormat="dd-MM-yyyy"
            placeholderText="Select due date"
            className={`${inputStyle} h-[48px] pr-9`}
          />

          <CalendarDays
            size={18}
            onClick={() => dateRef.current.setOpen(true)}
            className="absolute right-3 top-1/2 -translate-y-1/2 
                      text-slate-400 dark:text-slate-300 
                      cursor-pointer hover:text-indigo-500 transition"
          />
        </div>

      </div>

      {/* Row 2 - Description */}
      <textarea
        value={form.description}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, description: e.target.value }))
        }
        rows={4}
        placeholder="Task details"
        className={`${inputStyle} resize-none min-h-[120px]`}
      />

      {/* Divider */}
      <div className="border-t border-slate-200 dark:border-slate-700" />

      {/* Row 3 - Button */}
      <button
        className="w-full flex items-center justify-center gap-2 
                   rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 
                   px-4 py-3 font-semibold text-white 
                   transition duration-300 
                   hover:scale-[1.02] hover:shadow-lg"
      >
        <PlusCircle size={18} />
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;