import { Product } from '../../models'
import { Client } from '../../models'
import mongoose, { Document } from 'mongoose'
import * as Auth from '../../auth'
import { RequestResponse } from './invoice';
import {getProductsPipeline } from '../../pipelines';
import { toTitleCase } from './expense';
import { getStockSetPipeline } from '../../pipelines/sets';
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
    
      let result: any = await Product.aggregate(getProductsPipeline(orgId, query, offset, group, filter))

      result = group === 'date' ? 
      result.map((r: any)=>({
        ...r, 
        _id: r.records[0].createdAt
      }))  
      :
      result

      // console.log(JSON.stringify(result[1], null, 2))

      return result

    },
    stockSet: async (root: any, {group, groupLabel, offset, filter, query}: any , {req, res}:RequestResponse) => {
      Auth.checkSignedIn(req)
      const {data: {orgId, uid}}:any = req

      const pattern = new RegExp(`/^${groupLabel}/`);

      const result: any = await Product.aggregate(getStockSetPipeline(orgId, query, group, groupLabel, filter,offset))
      
      return result
    }
  },
  Mutation: {
    saveProduct: async (_: any, { product }:any, {req}: any ) => {
      let stock: any = {}

      Auth.checkSignedIn(req)
      const {data: {orgId, uid}}:any = req

      const client: any = await Client.findById(orgId);
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
