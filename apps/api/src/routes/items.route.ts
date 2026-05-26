import { Router } from 'express';
import {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from '../controllers/items.controller';
import { validate } from '../middleware/validate.middleware';
import { createItemSchema, updateItemSchema, itemIdSchema } from '@repo/shared';

const router = Router();

router.get('/', getItems);
router.get('/:id', validate({ params: itemIdSchema }), getItemById);
router.post('/', validate({ body: createItemSchema }), createItem);
router.put('/:id', validate({ params: itemIdSchema, body: updateItemSchema }), updateItem);
router.delete('/:id', validate({ params: itemIdSchema }), deleteItem);

export default router;
