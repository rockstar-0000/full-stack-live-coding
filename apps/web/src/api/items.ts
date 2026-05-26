import { api } from './client';
import type { Item, ApiResponse } from '@repo/shared';
import type { CreateItemInput, UpdateItemInput } from '@repo/shared';

export const getItems = async (): Promise<Item[]> => {
  const res = await api.get<ApiResponse<Item[]>>('/items');
  return res.data;
};

export const getItemById = async (id: number): Promise<Item> => {
  const res = await api.get<ApiResponse<Item>>(`/items/${id}`);
  return res.data;
};

export const createItem = async (input: CreateItemInput): Promise<Item> => {
  const res = await api.post<ApiResponse<Item>>('/items', input);
  return res.data;
};

export const updateItem = async (id: number, input: UpdateItemInput): Promise<Item> => {
  const res = await api.put<ApiResponse<Item>>(`/items/${id}`, input);
  return res.data;
};

export const deleteItem = async (id: number): Promise<void> => {
  await api.delete(`/items/${id}`);
};
