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
