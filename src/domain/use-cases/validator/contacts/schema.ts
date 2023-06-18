import Joi from 'joi';

export const createContactPayloadSchema = Joi.object({
  id: Joi.string(),
  surname: Joi.string().required(),
  firstName: Joi.string().required(),
  email: Joi.string().required(),
});
