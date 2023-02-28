import Joi from 'joi'

export default Joi.object({
    isAdmin: Joi.boolean(),
    msgToken: Joi.string(),
    phone: Joi.string().min(12).max(12).required(),
    password: Joi.string().min(4).max(12).required(),
})
