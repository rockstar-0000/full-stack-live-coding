import { Router } from 'express';
import itemsRouter from './items.route';

export const router = Router();

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

router.use('/items', itemsRouter);
