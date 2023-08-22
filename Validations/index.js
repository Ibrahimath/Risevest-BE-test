

const validateRegister = (user) => { 
    const schema = Joi.object({
        fullname: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(user);
}

module.exports = {
    validateRegister
}