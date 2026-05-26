import { useState } from 'react';
import { useItems } from '../hooks/useItems';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { Button } from '../components/ui/Button';

export function HomePage() {
  const { items, isLoading, error, createItem, deleteItem } = useItems();
  const [title, setTitle] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await createItem({ title });
    setTitle('');
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Items</h1>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add new item..."
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button type="submit">Add</Button>
      </form>

      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}

      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
            <span className={item.completed ? 'line-through text-gray-400' : ''}>{item.title}</span>
            <Button variant="danger" onClick={() => deleteItem(item.id)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </main>
  );
}
