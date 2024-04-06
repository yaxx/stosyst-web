import Joi from 'joi'

export default Joi.object({
    id: Joi.number().min(14).max(14).required(),
    phone: Joi.string().min(11).max(11).required(),
    password: Joi.string().min(4).max(10).required()
})

export const staffLogin =  Joi.object({
    username: Joi.string().min(4).max(16),
    password: Joi.string().min(4).max(12).required()
})
 