const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  email: Joi.string().min(3).max(255).required().email(),
  password: Joi.string().min(3).max(255).required(),
});

module.exports = schema;
