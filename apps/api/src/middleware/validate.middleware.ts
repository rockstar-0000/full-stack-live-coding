import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

interface ValidateSchemas {
  body?: ZodSchema;
  params?: ZodSchema;
  query?: ZodSchema;
}

export const validate =
  (schemas: ValidateSchemas) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const errors: Record<string, string> = {};

    if (schemas.body) {
      const result = schemas.body.safeParse(req.body);
      if (!result.success) {
        result.error.errors.forEach((e) => {
          errors[`body.${e.path.join('.')}`] = e.message;
        });
      } else {
        req.body = result.data;
      }
    }

    if (schemas.params) {
      const result = schemas.params.safeParse(req.params);
      if (!result.success) {
        result.error.errors.forEach((e) => {
          errors[`params.${e.path.join('.')}`] = e.message;
        });
      }
    }

    if (schemas.query) {
      const result = schemas.query.safeParse(req.query);
      if (!result.success) {
        result.error.errors.forEach((e) => {
          errors[`query.${e.path.join('.')}`] = e.message;
        });
      }
    }

    if (Object.keys(errors).length > 0) {
      res.status(400).json({ message: 'Validation failed', errors });
      return;
    }

    next();
  };
