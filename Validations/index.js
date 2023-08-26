const Joi = require("joi");

const validateRegister = (user) => {
  const schema = Joi.object({
    fullname: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    isAdmin: Joi.bool(),
  });
  return schema.validate(user);
};

const validateFile = (file) => {
  const schema = Joi.object({
    user_id: Joi.string().min(3).required(),
    fileName: Joi.string().min(1).required(),
    file_url: Joi.string().min(3).required(),
  });
  return schema.validate(file);
};

module.exports = {
  validateRegister,
  validateFile,
};
