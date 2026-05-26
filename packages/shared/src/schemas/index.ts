import { z } from 'zod';

export const createItemSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().max(1000).optional(),
  completed: z.boolean().optional().default(false),
});

export const updateItemSchema = createItemSchema.partial();

// Validates that a route param :id is a numeric string
export const itemIdSchema = z.object({
  id: z.string().regex(/^\d+$/, 'ID must be a positive integer'),
});

export type CreateItemInput = z.infer<typeof createItemSchema>;
export type UpdateItemInput = z.infer<typeof updateItemSchema>;
