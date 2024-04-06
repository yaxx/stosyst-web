import { Schema, model } from 'mongoose'

const TransactionSchema = new Schema({
    from: String,
    to: String,
    amount: Number,
    type: String,
    chanel: String,
}, { timestamps: true, strict: true })

const Transaction = model('Transaction', TransactionSchema);

export default Transaction 