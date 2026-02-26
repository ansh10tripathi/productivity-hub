import { useEffect, useMemo, useState } from 'react';
import api, { setAuthToken } from './api';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import FilterBar from './components/FilterBar';
import TodoList from './components/TodoList';

const AuthView = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const { data } = await api.post(endpoint, form);
      onAuthSuccess(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <main className="mx-auto mt-10 max-w-md rounded-2xl bg-white p-6 shadow-soft dark:bg-slate-900">
      <h1 className="text-2xl font-bold">{isLogin ? 'Login' : 'Create Account'}</h1>
      <p className="mb-4 text-sm text-slate-500">Manage your tasks securely with JWT auth.</p>
      <form onSubmit={handleSubmit} className="space-y-3">
        {!isLogin && (
          <input className="w-full rounded-xl border px-3 py-2 dark:bg-slate-800" placeholder="Name" onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
        )}
        <input className="w-full rounded-xl border px-3 py-2 dark:bg-slate-800" placeholder="Email" onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
        <input type="password" className="w-full rounded-xl border px-3 py-2 dark:bg-slate-800" placeholder="Password" onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} />
        {error && <p className="text-sm text-rose-500">{error}</p>}
        <button className="w-full rounded-xl bg-indigo-600 px-3 py-2 font-semibold text-white">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <button onClick={() => setIsLogin((v) => !v)} className="mt-3 text-sm text-indigo-600">
        {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
      </button>
    </main>
  );
};

const App = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [draggedId, setDraggedId] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    setAuthToken(token);
    if (token) {
      localStorage.setItem('token', token);
      fetchTodos();
    }
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const fetchTodos = async () => {
    const { data } = await api.get('/todos');
    setTodos(data);
  };

  const handleAuthSuccess = ({ token: jwt, user: currentUser }) => {
    setToken(jwt);
    setUser(currentUser);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setTodos([]);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthToken(null);
  };

  const createTodo = async (payload) => {
    const { data } = await api.post('/todos', payload);
    setTodos((prev) => [data, ...prev]);
  };

  const updateTodo = async (id, payload) => {
    const { data } = await api.put(`/todos/${id}`, payload);
    setTodos((prev) => prev.map((todo) => (todo._id === id ? data : todo)));
  };

  const deleteTodo = async (id) => {
    await api.delete(`/todos/${id}`);
    setTodos((prev) => prev.filter((todo) => todo._id !== id));
  };

  const toggleTodo = (id) => {
    const todo = todos.find((item) => item._id === id);
    updateTodo(id, { completed: !todo.completed });
  };

  const clearCompleted = async () => {
    await api.delete('/todos/completed/all');
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const handleDrop = async (targetId) => {
    if (!draggedId || draggedId === targetId) return;
    const next = [...todos];
    const from = next.findIndex((item) => item._id === draggedId);
    const to = next.findIndex((item) => item._id === targetId);
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    const withOrder = next.map((item, idx) => ({ ...item, order: idx }));
    setTodos(withOrder);
    setDraggedId(null);
    await api.patch('/todos/reorder', { orderedIds: withOrder.map((item) => item._id) });
  };

  const visibleTodos = useMemo(() => {
    return todos
      .filter((todo) => {
        if (filter === 'Active') return !todo.completed;
        if (filter === 'Completed') return todo.completed;
        return true;
      })
      .filter((todo) => [todo.title, todo.description].join(' ').toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => a.order - b.order);
  }, [todos, filter, search]);

  const activeCount = todos.filter((todo) => !todo.completed).length;

  if (!token || !user) return <AuthView onAuthSuccess={handleAuthSuccess} />;

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 text-slate-900 transition dark:bg-slate-950 dark:text-slate-100 md:px-8">
      <div className="mx-auto max-w-4xl space-y-4">
        <Header darkMode={darkMode} onToggleDarkMode={() => setDarkMode((v) => !v)} taskCount={activeCount} user={user} onLogout={handleLogout} />
        <TodoForm onSubmit={createTodo} />
        <FilterBar filter={filter} setFilter={setFilter} search={search} setSearch={setSearch} onClearCompleted={clearCompleted} />
        <TodoList
          todos={visibleTodos}
          onDelete={deleteTodo}
          onToggle={toggleTodo}
          onUpdate={updateTodo}
          onDragStart={setDraggedId}
          onDrop={handleDrop}
        />
      </div>
    </main>
  );
};

export default App;
