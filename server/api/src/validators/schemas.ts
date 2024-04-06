import Joi from 'joi'

export default Joi.object({
    phone: Joi.string().min(12).max(16).required(),
    password: Joi.string().min(6).max(16).required(),
})
export const User = Joi.object({
    firstName: Joi.string().min(2).max(20),
    lastName: Joi.string().min(2).max(20),
    phone: Joi.string().min(12).max(12).required(),
    account: {
        number: Joi.string().min(12).max(12).required(),
        balance: Joi.number().required(),
        type: Joi.string().required
    }
})
export const TransactionSchema = Joi.object({
    from: Joi.string().required(),
    to: Joi.string().required(),
    amount: Joi.number().required(),
    type: Joi.string(),
    account: {
        number: Joi.string().min(12).max(12).required(),
        balance: Joi.number().required(),
        type: Joi.string().required()
    }
})
export const SignUpScheema = Joi.object({
    firstName: Joi.string().min(2).max(20).required(),
    lastName: Joi.string().min(2).max(20),
    phone: Joi.string().min(12).max(12).required(),
    password: Joi.string().min(6).max(12).required(),
})
