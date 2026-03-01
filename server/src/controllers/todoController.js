import Todo from '../models/Todo.js';

export const getTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.userId }).sort({ order: 1, createdAt: -1 });
  res.json(todos);
};

export const createTodo = async (req, res) => {
  const { title, description, dueDate, priority } = req.body;
  const last = await Todo.findOne({ user: req.userId }).sort({ order: -1 });
  const todo = await Todo.create({
    user: req.userId,
    title,
    description,
    dueDate: dueDate || undefined,
    priority,
    order: (last?.order ?? -1) + 1,
  });
  res.status(201).json(todo);
};

export const updateTodo = async (req, res) => {
  const todo = await Todo.findOneAndUpdate({ _id: req.params.id, user: req.userId }, req.body, { new: true });
  if (!todo) return res.status(404).json({ message: 'Task not found' });
  res.json(todo);
};

export const deleteTodo = async (req, res) => {
  const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.userId });
  if (!todo) return res.status(404).json({ message: 'Task not found' });
  res.status(204).send();
};

export const clearCompleted = async (req, res) => {
  await Todo.deleteMany({ user: req.userId, completed: true });
  res.status(204).send();
};

export const reorderTodos = async (req, res) => {
  const { orderedIds } = req.body;
  await Promise.all(
    orderedIds.map((id, index) => Todo.findOneAndUpdate({ _id: id, user: req.userId }, { order: index })),
  );
  res.status(204).send();
};


export const getAnalytics = async (req, res) => {
  const userId = req.userId;
  const todos = await Todo.find({ user: userId });

  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const pending = total - completed;

  const completionRate =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  /* =========================
     PRIORITY DISTRIBUTION
  ========================== */
  const priorityStats = {
    low: todos.filter(t => t.priority === "Low").length,
    medium: todos.filter(t => t.priority === "Medium").length,
    high: todos.filter(t => t.priority === "High").length,
  };

  /* =========================
     DUE DATE STATS
  ========================== */
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueStats = {
    overdue: todos.filter(
      t => t.dueDate && new Date(t.dueDate) < today && !t.completed
    ).length,
    upcoming: todos.filter(
      t => t.dueDate && new Date(t.dueDate) >= today
    ).length,
  };

  /* =========================
     WEEKLY ACTIVITY (LAST 7 DAYS)
  ========================== */
  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const day = new Date();
    day.setDate(day.getDate() - i);
    day.setHours(0, 0, 0, 0);

    const nextDay = new Date(day);
    nextDay.setDate(day.getDate() + 1);

    const count = todos.filter(
      t =>
        new Date(t.createdAt) >= day &&
        new Date(t.createdAt) < nextDay
    ).length;

    last7Days.push({
      date: day.toLocaleDateString("en-US", { weekday: "short" }),
      tasks: count,
    });
  }

  /* =========================
     PRODUCTIVITY SCORE
     Formula:
     50% completion rate
     30% consistency (weekly avg)
     20% streak
  ========================== */

  const weeklyTotal = last7Days.reduce((sum, d) => sum + d.tasks, 0);
  const weeklyAverage = weeklyTotal / 7;

  /* =========================
     STREAK CALCULATION
  ========================== */

  let streak = 0;
  for (let i = 0; i < 30; i++) {
    const day = new Date();
    day.setDate(day.getDate() - i);
    day.setHours(0, 0, 0, 0);

    const nextDay = new Date(day);
    nextDay.setDate(day.getDate() + 1);

    const completedToday = todos.some(
      t =>
        t.completed &&
        t.updatedAt &&
        new Date(t.updatedAt) >= day &&
        new Date(t.updatedAt) < nextDay
    );

    if (completedToday) {
      streak++;
    } else {
      break;
    }
  }

  const productivityScore = Math.min(
    100,
    Math.round(
      completionRate * 0.5 +
        Math.min(weeklyAverage * 10, 30) +
        Math.min(streak * 5, 20)
    )
  );

  res.json({
    total,
    completed,
    pending,
    completionRate,
    priorityStats,
    dueStats,
    weeklyActivity: last7Days,
    productivityScore,
    streak,
  });
};