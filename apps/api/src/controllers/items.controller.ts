import { Request, Response } from 'express';
import * as itemsService from '../services/items.service';
import { asyncHandler } from '../lib/asyncHandler';
import type { CreateItemInput, UpdateItemInput } from '@repo/shared';

export const getItems = asyncHandler(async (_req: Request, res: Response) => {
  const items = await itemsService.findAll();
  res.json({ data: items });
});

export const getItemById = asyncHandler(async (req: Request, res: Response) => {
  const item = await itemsService.findById(Number(req.params.id));
  if (!item) {
    res.status(404).json({ message: 'Item not found' });
    return;
  }
  res.json({ data: item });
});

export const createItem = asyncHandler(async (req: Request, res: Response) => {
  const item = await itemsService.create(req.body as CreateItemInput);
  res.status(201).json({ data: item, message: 'Item created' });
});

export const updateItem = asyncHandler(async (req: Request, res: Response) => {
  const item = await itemsService.update(Number(req.params.id), req.body as UpdateItemInput);
  if (!item) {
    res.status(404).json({ message: 'Item not found' });
    return;
  }
  res.json({ data: item, message: 'Item updated' });
});

export const deleteItem = asyncHandler(async (req: Request, res: Response) => {
  await itemsService.remove(Number(req.params.id));
  res.status(204).send();
});
