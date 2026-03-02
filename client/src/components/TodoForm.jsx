import { useRef, useState } from "react";
import { PlusCircle, CalendarDays, Sparkles } from "lucide-react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import api from "../api";

const defaultForm = {
  title: "",
  description: "",
  dueDate: null,
  priority: "Medium",
};

const priorityColors = {
  Low: "bg-emerald-500",
  Medium: "bg-amber-500",
  High: "bg-rose-500",
};

export default function TodoForm({ onSubmit }) {
  const [form, setForm] = useState(defaultForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dateRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    setIsSubmitting(true);

    await onSubmit({
      ...form,
      title: form.title.trim(),
      dueDate: form.dueDate
        ? format(form.dueDate, "yyyy-MM-dd")
        : "",
    });

    setForm(defaultForm);
    setTimeout(() => setIsSubmitting(false), 400);
  };

  // 🔥 AI Smart Autofill
  const handleAISuggest = async () => {
    if (!form.title.trim()) {
      console.log("Title is empty");
      return;
    }

    console.log("Calling backend with:", form.title);

    try {
      const res = await api.post("/ai/suggest", {
        title: form.title,
      });

      console.log("Backend response:", res.data);

      setForm((prev) => ({
        ...prev,
        description: res.data.description,
        priority: res.data.priority,
      }));
    } catch (err) {
      console.error("AI ERROR:", err.response?.data || err.message);
    }
  };

  const baseInput =
    "peer w-full rounded-xl px-4 pt-5 pb-2 border bg-transparent " +
    "border-slate-300 dark:border-slate-600 " +
    "focus:outline-none focus:ring-2 focus:ring-indigo-500 " +
    "transition-all duration-300 text-slate-900 dark:text-slate-100";

  const labelStyle =
    "absolute left-4 top-2 text-xs text-slate-400 transition-all duration-200";

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative rounded-2xl p-6 space-y-6
      bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl
      border border-slate-200 dark:border-slate-700
      shadow-xl transition-all duration-300
      ${isSubmitting ? "scale-[0.99]" : ""}`}
    >
      {/* Row 1 */}
      <div className="grid md:grid-cols-12 gap-4 items-center">

        {/* Title */}
        <div className="relative md:col-span-6">
          <input
            placeholder=" "
            value={form.title}
            onChange={(e) =>
              setForm((p) => ({ ...p, title: e.target.value }))
            }
            className={baseInput}
          />
          <label className={`${labelStyle}
            peer-placeholder-shown:top-3 
            peer-placeholder-shown:text-sm
            peer-focus:top-2 
            peer-focus:text-xs`}>
            Task Title
          </label>
        </div>

        {/* Priority */}
        <div className="relative md:col-span-3">
          <select
            value={form.priority}
            onChange={(e) =>
              setForm((p) => ({ ...p, priority: e.target.value }))
            }
            className={baseInput}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          {/* Color Indicator */}
          <span
            className={`absolute right-4 top-1/2 -translate-y-1/2 
            w-3 h-3 rounded-full ${priorityColors[form.priority]}`}
          />
        </div>

        {/* Date */}
        <div className="relative md:col-span-3">
          <DatePicker
            ref={dateRef}
            selected={form.dueDate}
            onChange={(date) =>
              setForm((p) => ({ ...p, dueDate: date }))
            }
            dateFormat="dd-MM-yyyy"
            placeholderText=" "
            className={`${baseInput} pr-10`}
          />
          <label className={`${labelStyle}`}>
            Due Date
          </label>

          <CalendarDays
            size={18}
            onClick={() => dateRef.current.setOpen(true)}
            className="absolute right-3 top-1/2 -translate-y-1/2
                       text-slate-400 cursor-pointer hover:text-indigo-500"
          />
        </div>
      </div>

      {/* Description */}
      <div className="relative">
        <textarea
          rows={4}
          placeholder=" "
          value={form.description}
          onChange={(e) =>
            setForm((p) => ({ ...p, description: e.target.value }))
          }
          className={`${baseInput} resize-none min-h-[120px]`}
        />
        <label className={`${labelStyle}
          peer-placeholder-shown:top-3 
          peer-placeholder-shown:text-sm
          peer-focus:top-2 
          peer-focus:text-xs`}>
          Task Details
        </label>
      </div>

      {/* AI Suggest */}
      <button
        type="button"
        onClick={() => {
          console.log("AI button clicked");
          handleAISuggest();
        }}
        className="flex items-center gap-2 text-sm text-indigo-500
                  hover:underline transition"
      >
        <Sparkles size={16} />
        AI Smart Suggest
      </button>

      {/* Submit */}
      <button
        className="w-full flex items-center justify-center gap-2
        rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600
        px-4 py-3 font-semibold text-white
        transition-all duration-300
        hover:scale-[1.02] hover:shadow-2xl"
      >
        <PlusCircle size={18} />
        Add Task
      </button>
    </form>
  );
}