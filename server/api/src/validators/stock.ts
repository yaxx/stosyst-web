import Joi from "joi";

export default Joi.object({
    _id: Joi.string().min(1).max(20).required(),
    title: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(3).max(100),
    category: Joi.string().min(3).max(30),
    instock: Joi.number().min(1).required(),
    createdAt: Joi.string(),
    modified: Joi.date()
})