import { Product } from '../../models'
import { Client } from '../../models'
import mongoose, { Document } from 'mongoose'
import * as Auth from '../../auth'
import { RequestResponse } from './invoice';
import {getProductsPipeline } from '../../pipelines';
import { toTitleCase } from './expense';
// import { sendMessage } from '../../messaging/fcm';

const { ThermalPrinter, PrinterTypes, CharacterSet, BreakLine } = require('node-thermal-printer');

let ObjectId = require('mongodb').ObjectID;

const { PubSub } = require("graphql-subscriptions");

export const pubsub = new PubSub();

export default {
  Query: {
    products: async (root: any, {group, offset, filter, query}: any , {req, res}:RequestResponse) => {
      Auth.checkSignedIn(req)
      const {data: {orgId, uid}}:any = req
      // console.log(query)

      // let stocks = await Product.find().lean()

      // stocks.forEach(stock => {
      //   Product.findByIdAndUpdate(ObjectId(stock._id), {
      //       ...stock,
      //       expiryWarning: stock.expiry ? 2 : stock.expiryWarning
      //     },(e, doc)=>{
      //         if(e) console.log(e)
      //     })
      // })

      // stocks.forEach((stock: any) => {
      //   if(stock.description.trim().slice(-5).includes('/')) {
      //     const d = stock.description.trim().slice(-5).split('/')
      //      Product.findByIdAndUpdate(ObjectId(stock._id), {
      //       ...stock,
      //       name: stock.name.trim(),
      //       category: stock.category.trim(),
      //       description: stock.description.trim(),
      //       expiry: new Date(`20${d[1]}-${d[0]}-01`)
      //     },(e:any, doc:Document)=>{
      //         if(e) console.log(e)
      //     })
      //   } else if(stock.description.trim().slice(-5).includes('-')) {
      //     const d = stock.description.trim().slice(-5).split('-')
      //     Product.findByIdAndUpdate(ObjectId(stock._id), {
      //       ...stock,
      //       name: stock.name.trim(),
      //       category: stock.category.trim(),
      //       description: stock.description.trim(),
      //       expiry: new Date(`20${d[1]}-${d[0]}-01`)
      //     },(e:any, doc:Document)=>{
      //         if(e) console.log(e)
      //     })
      //   }
      // })

      // sendMessage()
    
      let result: any = await Product.aggregate(getProductsPipeline(orgId, query, offset, group, filter))

      result = group === 'date' ? 
      result.map((r: any)=>({
        ...r, _id: r.records[0].createdAt
      }))  
      :
      result

      return result

    }
  },

  Mutation: {
    saveProduct: async (_: any, { product }:any, {req}: any ) => {
      let stock: any = {}

      Auth.checkSignedIn(req)

      const client: any = await Client.findById(req.data.orgId);
      const staff = client?.staffs.find((s:any) => s._id.toString() === req.data.uid) 
      const isAdmin = req.data.orgId === req.data.uid 
      let user = isAdmin ? 
      ({
        _id: client?._id,
        firstName: client.name,
        phone: client.phone,
        email: client.email
      })
      :
      ({
        _id: staff._id,
        firstName: staff.firstName,
        lastName: staff.lastName,
        phone: staff.phone,
        email: staff.email
      })

      stock = !product._id ? await Product.create({
        ...product,
        added: user,
        modified: user,
        owner: req.data.orgId
      }) 
      : 
      stock = await Product.findByIdAndUpdate(product._id, {
         ...product,
         modified: user
        }, { new: true }
      )
      console.log(JSON.stringify(stock, null, 2))
      pubsub.publish('STOCKS', { stock })
      return stock
    },


    deleteProduct: async (_: any, { id }: any) => {
        return await Product.findByIdAndDelete(id)
    }
  },
  Subscription: {
    stock: {
      subscribe: (_: any, __: any, {  }: any) => pubsub.asyncIterator(['STOCKS'])
    }
  }
}
