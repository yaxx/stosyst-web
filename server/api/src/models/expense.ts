import { Schema, model } from 'mongoose'
import { Person } from './invoice';

const ExpenseSchema = new Schema({
    name: String,
    desc: String,
    spender: String,
    amount: Number,
    added: Person,
    modified: Person,
    seen: [
        {
            usr: String,
            at: {
                type: Date,
                default: Date.now
            }
        }
    ],
    modifier: { 
        type: String, default: '' 
    }
},{ timestamps: true, strict: true })

const Expense = model('Expense', ExpenseSchema);

export default Expense 