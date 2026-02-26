import { motion } from 'framer-motion';
import TodoItem from './TodoItem';

const TodoList = ({ todos, ...props }) => {
  if (!todos.length) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-2xl bg-white p-8 text-center shadow-soft dark:bg-slate-900"
      >
        <div className="mx-auto mb-3 h-20 w-20 rounded-full bg-indigo-100" />
        <h3 className="text-lg font-semibold">No tasks found</h3>
        <p className="text-sm text-slate-500">You're all caught up. Add a task to get started.</p>
      </motion.div>
    );
  }

  return (
    <motion.div layout className="space-y-3">
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} {...props} />
      ))}
    </motion.div>
  );
};

export default TodoList;
