import { Request, Response, NextFunction } from "express";
import Joi from "joi";

type SchemaPart = {
  body?: Joi.ObjectSchema;
  query?: Joi.ObjectSchema;
  params?: Joi.ObjectSchema;
};

export const validate = (schema: SchemaPart) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: any[] = [];

    if (schema.body) {
      const { error } = schema.body.validate(req.body, { abortEarly: false });
      if (error) errors.push({ source: "body", details: error.details });
    }
    if (schema.query) {
      const { error } = schema.query.validate(req.query, { abortEarly: false });
      if (error) errors.push({ source: "query", details: error.details });
    }
    if (schema.params) {
      const { error } = schema.params.validate(req.params, { abortEarly: false });
      if (error) errors.push({ source: "params", details: error.details });
    }

    if (errors.length > 0) {
      return res.status(400).json({ message: "Validation failed", errors });
    }

    return next();
  };
};
