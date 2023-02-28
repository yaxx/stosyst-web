import { Schema, model } from 'mongoose'

 export const Person =  new Schema({
  firstName: String,
  lastName: String,
  phone: String,
  email: String,
  address: String
})

const InvoiceSchema = new Schema({
  tid: String,
  stocks: [{
    item: {
      _id: String,
      name: String,
      description: String,
      category: String,
      owner: String,
      costPrice: Number,
      sellingPrice: Number,
      instock: Number,
      added: Person,
      modified: Person,
      stockImage: {
        type: String,
        default: "https://nextoma-bucket.s3.us-east-2.amazonaws.com/56c479300400ec4d5005f932f1599d99"
      },
    },
    quantity: Number,
    delivered: Number,
    booked: Boolean,
  }],
  modifier: { 
    type: String, 
    default: '' 
  },
  seen: [
      {
        usr: String,
        at: {
            type: Date,
            default: Date.now
        }
      }
  ],
  recieved: Number,
  payable: Number,
  completed: Boolean,
  customer: Person,
  added: Person,
  modified: Person,
}, 
{ 
  timestamps: true 
})

const Invoice = model('Invoice', InvoiceSchema)

export default Invoice