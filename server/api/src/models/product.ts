import { number } from 'joi';
import { Timestamp } from 'mongodb';
import { Schema, model } from 'mongoose'
import { Person } from './invoice';

const ProductSchema = new Schema({
        name: String,
        description: String,
        category: String,
        subCategory: String,
        costPrice: Number,
        sellingPrice: Number,   
        instock: Number,
        stockImage: String,
        warningCount: Number,
        expiry: {type: Date},
        expiryWarning: Number,
        owner: {
                type: String, 
                default: '' 
        },
        added: Person,
        modified: Person,
},{ timestamps: true, strict: true }
)
const Product = model('Product', ProductSchema);

export default Product 