import express from 'express';
import cors from 'cors';
import { loggerMiddleware } from './middleware/logger.middleware';
import { errorMiddleware } from './middleware/error.middleware';
import { router } from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

// Versioned API routes
app.use('/api/v1', router);

// Centralized error handler — must be registered last
app.use(errorMiddleware);

export default app;
