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

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get("/todos/analytics");
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAnalytics();
  }, []);

  if (!data)
    return (
      <div className="p-6 text-slate-400 animate-pulse">
        Loading analytics...
      </div>
    );

  const pieData = [
    { name: "Completed", value: data.completed },
    { name: "Pending", value: data.pending },
  ];

  const priorityData = [
    { name: "Low", value: data.priorityStats.low || 0 },
    { name: "Medium", value: data.priorityStats.medium || 0 },
    { name: "High", value: data.priorityStats.high || 0 },
  ];

  return (
    <div className="space-y-10">

      <h2 className="text-xl font-semibold text-slate-300">
        📊 Analytics Overview
      </h2>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

        <StatCard title="Total Tasks" value={data.total} />
        <StatCard title="Completed" value={data.completed} />
        <StatCard title="Pending" value={data.pending} />

        {/* Productivity Score */}
        <div className="rounded-2xl bg-gradient-to-br from-indigo-700 to-purple-700 p-6 text-white shadow-lg">
          <p className="text-sm opacity-80">Productivity Score</p>
          <p className="text-3xl font-bold mt-2">
            <CountUp end={data.productivityScore} duration={1} />%
          </p>
        </div>

        {/* Streak */}
        <div className="rounded-2xl bg-gradient-to-br from-orange-600 to-red-600 p-6 text-white shadow-lg">
          <p className="text-sm opacity-80">🔥 Current Streak</p>
          <p className="text-3xl font-bold mt-2">
            <CountUp end={data.streak} duration={1} /> days
          </p>
        </div>

      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Completion Pie */}
        <div className="rounded-2xl bg-slate-900 p-6 border border-slate-800 shadow-xl">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">
            Completion Overview
          </h3>

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
        </div>

        {/* Priority Bar */}
        <div className="rounded-2xl bg-slate-900 p-6 border border-slate-800 shadow-xl">
          <h3 className="text-lg font-semibold text-slate-200 mb-4">
            Priority Distribution
          </h3>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={priorityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="value" fill={BAR_COLOR} radius={[8,8,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Weekly Activity Line Chart */}
      <div className="rounded-2xl bg-slate-900 p-6 border border-slate-800 shadow-xl">
        <h3 className="text-lg font-semibold text-slate-200 mb-4">
          Weekly Activity
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.weeklyActivity}>
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
      </div>

      {/* Due Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DueCard title="Overdue Tasks" value={data.dueStats.overdue} color="from-red-600 to-red-800" />
        <DueCard title="Upcoming Tasks" value={data.dueStats.upcoming} color="from-emerald-600 to-green-800" />
      </div>

    </div>
  );
}

/* =============================
   Reusable Components
============================= */

function StatCard({ title, value }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 border border-slate-700 shadow-lg hover:scale-[1.02] transition duration-300">
      <p className="text-sm text-slate-400">{title}</p>
      <p className="text-3xl font-bold text-white mt-2">
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