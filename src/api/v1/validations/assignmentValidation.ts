import Joi from "joi";

export const assignmentSchemas = {
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
            status: Joi.string()
            .valid("pending", "completed", "overdue")
            .required(),
            grade: Joi.string()
            .valid('A','B','C','D','F')
            .optional(),
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
            status: Joi.string()
            .valid("pending", "completed", "overdue")
            .optional(),
            grade: Joi.string()
            .valid('A','B','C','D','F')
            .optional(),
        }),
  },
};
