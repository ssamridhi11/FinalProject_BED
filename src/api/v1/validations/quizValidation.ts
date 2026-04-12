import Joi from "joi"
export const quizSchemas = {
    create: {
        body: Joi.object({
            courseId: Joi.string()
            .required(),
            title: Joi.string()
            .min(3)
            .max(100)
            .required(),
            dueDate: Joi.date()
            .required(),
            attempts: Joi.number()
            .integer()
            .min(0)
            .required(),
            score: Joi.number()
            .min(0)
            .max(100)
            .required(),
        }),
  },
    update: {
        body: Joi.object({
            courseId: Joi.string()
            .optional(),
            title: Joi.string()
            .min(3)
            .max(100)
            .optional(),
            dueDate: Joi.date()
            .optional(),
            attempts: Joi.number()
            .integer()
            .min(0)
            .optional(),
            score: Joi.number()
            .min(0)
            .max(100)
            .optional(),
        }),
  },
};
