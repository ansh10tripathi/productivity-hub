import { Search } from 'lucide-react';

const FilterBar = ({ filter, setFilter, search, setSearch, onClearCompleted }) => {
  const filters = ['All', 'Active', 'Completed'];

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-soft dark:bg-slate-900 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-2">
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`rounded-xl px-3 py-1.5 text-sm font-medium transition ${
              filter === item
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="flex flex-1 items-center gap-2 md:max-w-sm">
        <Search size={18} className="text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800"
        />
      </div>

      <button
        onClick={onClearCompleted}
        className="rounded-xl bg-rose-100 px-3 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-200"
      >
        Clear completed
      </button>
    </div>
  );
};

export default FilterBar;
