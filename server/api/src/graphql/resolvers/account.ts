import mongoose, { Model } from 'mongoose'
import { Client, Invoice, Expense } from '../../models'
import { cred } from '../../validations'
import * as Auth from '../../auth'
import jwt  from 'jsonwebtoken'

let ObjectId    = require('mongodb').ObjectID;

export default {
  Query: {
    me: async (root:any, args:any, { req }:{req: Request}) => {
      Auth.checkSignedIn(req)
      const {data: {orgId, uid}}:any = req
      const client:any = Client.findById(orgId);
      client.staffs = uid !== orgId ? client.staffs.filter((s:any)=>s._id !== uid) : client!.staffs
      return client
    },

    account: async (root:any, args:any, { req }:{req: Request}) => {
      Auth.checkSignedIn(req)
      const {data: {orgId, uid}}:any = req
      return await Client.findById(orgId);
    },

    staffs: async (root:any, args:any, { req }:{req: Request}) => {
      Auth.checkSignedIn(req)
      const {data: {orgId, uid}}:any = req
      const { staffs } = await Client.findById(orgId) as any;
      return staffs
    },

    staff: async (root:any, { id }:{id: string}, { req }:{req: Request}) => {
      Auth.checkSignedIn(req)
      const {data: {orgId, uid}}: any = req
      const { staffs } = await Client.findById(orgId) as any;
      return id ? staffs.find((s: any)=> s._id.toString() === id ) : staffs.find((s: any) => s._id.toString() === uid ) 
    },
  },
  Mutation: {
    signUp: async (root: any, { info }: any, { req }:{req: Request}) => {
        await cred.validateAsync(info);
        const {name, phone, password, msgToken} = info
        const newClient  =  await Client.create({name, phone, password, msgTokens:[msgToken.trim()]});
        const signature  = jwt.sign({
          orgId: newClient._id, 
          uid: newClient._id 
        }, 
        'crypto'
        )
        return ({
            dp: newClient.dp, 
            org: newClient._id, 
            usr: newClient._id,
            name: newClient.name,
            token:`Bearer ${signature}`,
        })
    },
    signIn: async (root: any, { creds }: any, { req }:{req: Request}) => {

      console.log(creds)
        // const { userId } = req.session;
        // if(userId)
        // return Client.findById(userId);
        // const data = await Auth.attemptSignIn(creds)
        return await Auth.attemptSignIn(creds);
    },

    // signOut: async (root, { person }, { req, res }, info ) => {
    //   Auth.checkSignedIn(req)
    //   Auth.signOut(req, res)
    //   return user;
    // },

    saveInfo: async (root: any, { staff }: any, { req, res }: any, info: any ) => {
      Auth.checkSignedIn(req)
      const {data: {orgId, uid}} = req
      let client:any = {}
      let updated = null

      if(!staff._id) {
        client = await Client.findByIdAndUpdate(orgId, 
         { 
           $push:{ staffs: staff }
         }, 
         {new: true}
        ).lean()
        updated = client.staffs[client.staffs.length - 1]
         
        await Invoice.updateMany(
          {
           modifier: req.data.orgId
          },
          { 
           $push:{ seen: {usr: updated._id } }
          }
        )
        await Expense.updateMany(
          {
            modifier: req.data.orgId
          },
          { 
           $push:{ seen: { usr: updated._id } }
          }
        )

      } else {
        client = await Client.findById(req.data.orgId)
        client!.staffs = client!.staffs.map((s: any)=>(s._id.toString() === staff._id.toString()) ? staff : s )
        await Client.findByIdAndUpdate(req.data.orgId,{ staffs: client.staffs }, {new: true})
        updated = staff
      }
      return updated
    },

    updateAccount: async (root: any, { accountInfo }: any, { req }: any, info: any) => {
      Auth.checkSignedIn(req)
      return await Client.findByIdAndUpdate(req.data.orgId,{...accountInfo}, {new: true})

    },
    deleteStaff: async (root: any, { id }: {id: string}, { req }: any, info: any) => {
      Auth.checkSignedIn(req)
      let { staffs } = await Client.findById(req.data.orgId) as any;
      staffs = staffs.filter((s: any) => s._id.toString() !== id )
      await Client.findByIdAndUpdate(req.data.orgId,{ staffs }, {new: true})
      return { id }
    }
  }
}
