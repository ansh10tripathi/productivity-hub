import { Moon, Sun, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = ({ darkMode, onToggleDarkMode, taskCount, user, onLogout }) => (
  <motion.header
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className="rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 p-6 text-white shadow-soft"
  >
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-bold md:text-3xl">
          <CheckCircle2 /> TaskFlow Pro
        </h1>
        <p className="mt-1 text-sm text-indigo-100">{taskCount} tasks left • Welcome, {user?.name}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleDarkMode}
          className="rounded-xl bg-white/20 p-2 transition hover:scale-105 hover:bg-white/30"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button
          onClick={onLogout}
          className="rounded-xl bg-white/20 px-3 py-2 text-sm font-semibold transition hover:scale-105 hover:bg-white/30"
        >
          Logout
        </button>
      </div>
    </div>
  </motion.header>
);

export default Header;
