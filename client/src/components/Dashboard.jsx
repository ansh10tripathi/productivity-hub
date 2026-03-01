import { useEffect, useState } from "react";
import api from "../api";
import CountUp from "react-countup";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const PIE_COLORS = ["#22c55e", "#ef4444"];
const BAR_COLOR = "#6366f1";
const LINE_COLOR = "#38bdf8";

export default function Dashboard({ refreshKey }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const res = await api.get("/todos/analytics");
        setData(res.data);
      } catch (err) {
        console.error("Analytics fetch failed:", err.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [refreshKey]); // 🔥 auto-refresh when todos change

  if (loading) {
    return (
      <div className="p-6 text-slate-400 animate-pulse">
        Loading analytics...
      </div>
    );
  }

  if (!data) return null;

  const pieData = [
    { name: "Completed", value: data.completed || 0 },
    { name: "Pending", value: data.pending || 0 },
  ];

  const priorityData = [
    { name: "Low", value: data.priorityStats?.low || 0 },
    { name: "Medium", value: data.priorityStats?.medium || 0 },
    { name: "High", value: data.priorityStats?.high || 0 },
  ];

  return (
    <div className="space-y-10">

      <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-300">
        📊 Analytics Overview
      </h2>

      {/* ================= TOP CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

        <StatCard title="Total Tasks" value={data.total || 0} />
        <StatCard title="Completed" value={data.completed || 0} />
        <StatCard title="Pending" value={data.pending || 0} />

        {/* Productivity */}
        <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 p-6 text-white shadow-lg">
          <p className="text-sm opacity-80">Productivity Score</p>
          <p className="text-3xl font-bold mt-2">
            <CountUp end={data.productivityScore || 0} duration={1} />%
          </p>
        </div>

        {/* Streak */}
        <div className="rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 p-6 text-white shadow-lg">
          <p className="text-sm opacity-80">🔥 Current Streak</p>
          <p className="text-3xl font-bold mt-2">
            <CountUp end={data.streak || 0} duration={1} /> days
          </p>
        </div>

      </div>

      {/* ================= CHARTS ROW ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Pie Chart */}
        <ChartCard title="Completion Overview">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={80}
                innerRadius={40}
                paddingAngle={4}
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={PIE_COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Bar Chart */}
        <ChartCard title="Priority Distribution">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={priorityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="value" fill={BAR_COLOR} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

      </div>

      {/* ================= WEEKLY ACTIVITY ================= */}
      <ChartCard title="Weekly Activity">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.weeklyActivity || []}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="date" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="tasks"
              stroke={LINE_COLOR}
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* ================= DUE STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DueCard
          title="Overdue Tasks"
          value={data.dueStats?.overdue || 0}
          color="from-red-500 to-red-700"
        />
        <DueCard
          title="Upcoming Tasks"
          value={data.dueStats?.upcoming || 0}
          color="from-emerald-500 to-green-700"
        />
      </div>

    </div>
  );
}

/* ============================= */
/* Reusable Components */
/* ============================= */

function StatCard({ title, value }) {
  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 border border-slate-200 dark:border-slate-700 shadow-md">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
        <CountUp end={value} duration={1} />
      </p>
    </div>
  );
}

function DueCard({ title, value, color }) {
  return (
    <div className={`rounded-2xl bg-gradient-to-br ${color} p-6 text-white shadow-lg`}>
      <p className="text-sm opacity-80">{title}</p>
      <p className="text-3xl font-bold mt-2">
        <CountUp end={value} duration={1} />
      </p>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 border border-slate-200 dark:border-slate-700 shadow-md">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
        {title}
      </h3>
      {children}
    </div>
  );
}