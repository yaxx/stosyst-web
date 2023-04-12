import Joi from 'joi'

export default Joi.object({
    isAdmin: Joi.boolean(),
    msgToken: Joi.string(),
    category: Joi.string(),
    name: Joi.string().min(3).max(50).required(),
    phone: Joi.string().min(11).max(11).required(),
    password: Joi.string().min(4).max(12).required(),
})
