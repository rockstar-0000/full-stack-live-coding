import { useState, useEffect, useCallback } from 'react';
import type { Item } from '@repo/shared';
import type { CreateItemInput } from '@repo/shared';
import * as itemsApi from '../api/items';

export function useItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await itemsApi.getItems();
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch items');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const createItem = async (input: CreateItemInput) => {
    const newItem = await itemsApi.createItem(input);
    setItems((prev) => [newItem, ...prev]);
  };

  const deleteItem = async (id: number) => {
    await itemsApi.deleteItem(id);
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return { items, isLoading, error, createItem, deleteItem, refetch: fetchItems };
}
