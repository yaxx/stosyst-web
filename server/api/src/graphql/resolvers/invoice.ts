import { Product, Invoice } from '../../models'
import { Client } from '../../models'
import * as Auth from '../../auth'
// import {PubSub, withFilter } from 'graphql-subscriptions';
import { pubsub } from './product';
import { groupInvoice, sortInvoice, sortOrder } from '../../pipelines/groupers';
import stock from '../../validations/stock';
import { sendMessage } from '../../messaging/fcm';
import { getSorter } from '../../pipelines/sorter';
import { getInvoicePipeline } from '../../pipelines/invoices';


let ObjectId  = require('mongodb').ObjectID;
// const pubsub = new PubSub();

const ONCHECKOUT = "ONCHECKOUT"
const ONSTOCKQTYCHANGE = "ONSTOCKQTYCHANGE"

export interface RequestResponse {
  req: Request;
  res: Response;
}

export default {
  Query: {
    invoices: async (root:any, { query,filter, offset, group }:any, {req, res}:RequestResponse ) => {
      Auth.checkSignedIn(req);
      const {data: {orgId, uid}}:any = req

      // let inv:any = Invoice.find().lean()

      // console.log(inv.length)

      // inv.forEach((i:any) => {
      //   if(!i.paymentMethod){
      //     Invoice.updateMany({},{...i, paymentMethod: ''});
      //   }
      // })

      // await Invoice.updateMany({},{$set: {paymentMethod: ''}},{upsert: true});

     
      let result = await Invoice.aggregate(getInvoicePipeline(orgId, query, filter, group, offset ))

      result = group === 'date' ? 
        result.map((r: any)=>({
          ...r, _id: r.records[0].createdAt
        }))
        :
        result
      return result
    },
    searchInvoices:  async (root:any, { query, group }:{query: string, group: string},{req, res}:RequestResponse ) => {
      Auth.checkSignedIn(req);
      const {data: {orgId, uid}}:any = req
      let invoices = await Invoice.aggregate([
        {
          $search: {
            text: {
              query,
              fuzzy: {
                maxEdits: 2,
              },
              path: [
                'customer.firstName',
                'customer.phone',
                'stocks.item.name',
                'stocks.item.category',
                'stocks.item.description'
              ]
            }
          }
        },
        {
          $match: { modifier: orgId }
        },
        {
          $group: groupInvoice(group)
        },
        {
          $sort: {
              year: -1, 
              month: -1, 
              day: 1
          }
        }
    ])
    return invoices
  } 
},
  Mutation: {
    checkOut: async (_:any, { invoice }:any, {req, res}:RequestResponse) => {

      Auth.checkSignedIn(req)
      const {data: {orgId, uid}}:any = req
      let updatedStocks:any = [];
      const client: any = await Client.findById(orgId);
      const staff: any = client.staffs.find((s: any) => s._id.toString() === uid) 
      const isAdmin = orgId === uid 

      let user = isAdmin ? 
      ({
        _id: client._id,
        firstName: client.name,
        phone: client.phone,
        email: client.email
      })
      :
      ({
        _id: staff._id,
        phone: staff.phone,
        email: staff.email,
        lastName: staff.lastName,
        firstName: staff.firstName,
      })
      let newInvoice: any  = {};

      if(invoice._id) {
        let oldInvoice: any = await Invoice.findById(invoice._id).lean();
        oldInvoice.stocks = oldInvoice.stocks.map((oldStock:any) => 
        {
          let stock = invoice.stocks.find((newStock:any) => newStock.item._id === oldStock.item._id)
          let diff = (stock.quantity - oldStock.quantity) * -1;

          if(diff) 
             Product.findByIdAndUpdate(stock.item._id, { $inc:{ instock:diff }}, {new: true}, (e, data) => {
               if(e) {
                  throw e
               } else {
                 updatedStocks.push(data)
               }
             });

          return stock;
        })
        oldInvoice  = {
          ...oldInvoice,
          modified: user,
          recieved: invoice.recieved,
          completed: invoice.completed,
          customer: invoice.customer,
          paymentMethod: invoice.paymentMethod
        }
        newInvoice = await Invoice.findByIdAndUpdate(invoice._id,{ ...oldInvoice },{new: true})
      } else {
        newInvoice = await Invoice.create({
          ...invoice, 
          added: user,
          modified: user,
          modifier: orgId,
          seen:[{usr: orgId}]
        })
        invoice = {
          ...invoice,
          stocks: invoice.stocks.map((s:any) => ({
            ...s, 
            item: {
              ...s.item, 
              instock: s.item.instock - s.quantity
            }
          }
          )),
          modified: user,
        }
      }

      let stocks: any = invoice.stocks.map((s: any)=> s.item)

      invoice.stocks.forEach(async (i:any) => {
        await Product.findByIdAndUpdate(i.item._id, { $inc:{ instock:(i.quantity*-1) }}, { new: true })
      })

      sendMessage(invoice, client.msgTokens)
      // pubsub.publish(ONCHECKOUT, { invoice: newInvoice })
      // pubsub.publish(ONSTOCKQTYCHANGE, { stocks })
      return newInvoice;
    },

    deleteInvoice: async (_:any, { refund }: any) => {
      let oldInvoice: any = await Invoice.findById(refund.invoiceId);

      const stockToRemove: any = oldInvoice.stocks.find((stock:any) => stock._id.toString() === refund.stock._id)

      oldInvoice.stocks = oldInvoice.stocks.filter((stock:any) => stock._id.toString() != refund.stock._id)

      oldInvoice.stocks.length === 0 ? 
      await Invoice.findByIdAndDelete(refund.invoiceId)
      :
      await oldInvoice.save()
         
      await Product.findByIdAndUpdate(refund.stock.item._id, {
         $inc:{ 
           instock: refund.stock.quantity 
          }
        }, 
        {
          new: true
        })        
      return stockToRemove
    }
  },

  Subscription: {
    onCheckOut: {
      // subscribe: withFilter(
      //   () => pubsub.asyncIterator([ONCHECKOUT]),
      //   ({ invoice }, {clientId, usr}) => {
      //     return ((invoice.modifier === clientId) && (usr !== invoice.added._id))
      //   }
      // ) 
    },
    onStockQtyChange: {
      // subscribe: withFilter(
      //   () => pubsub.asyncIterator([ONSTOCKQTYCHANGE]),
      //   ({stocks}, {clientId, usrId}) => {
      //     return ((stocks[0].owner === clientId))
      //   }
      // ) 
    }
  }
}