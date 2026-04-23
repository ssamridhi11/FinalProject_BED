import Joi from "joi";
export const courseSchemas = {
    create: {
        body: Joi.object({
            title: Joi.string()
            .min(3)
            .max(100)
            .required(),
            description: Joi.string()
            .min(5)
            .max(500)
            .required(),
            endDate: Joi.date()
            .required(),
        }),
    },
    update: {
        body: Joi.object({
            title: Joi.string()
            .min(3)
            .max(100)
            .optional(),
            description: Joi.string()
            .min(5)
            .max(500)
            .optional(),
            endDate: Joi.date()
            .optional(),
        }),
  },
};
