import Joi from "joi";

const create = Joi.object({
  name: Joi.string().required(),
  slug: Joi.string().required(),
  parentId: Joi.string(),
  children: Joi.array(),
  tags: Joi.array(),
});

const update = Joi.object({
  name: Joi.string().required(),
  slug: Joi.string().required(),
  parentId: Joi.string(),
  children: Joi.array(),
  tags: Joi.array(),
});

export default {
  create,
  update,
};
