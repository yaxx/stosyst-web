import mongoose, { Model } from 'mongoose'
import { Client, Invoice, Expense } from '../../models'
import { cred } from '../../validations'
import * as Auth from '../../auth'
import jwt from 'jsonwebtoken'
import { addAccObject } from '../../validations/client'

let ObjectId = require('mongodb').ObjectID;

export var verifyPhoneNumber: boolean = true
export var verifyEmail: boolean = true

export default {
  Query: {
    me: async (root: any, args: any, { req }: { req: Request }) => {
      Auth.checkSignedIn(req)
      const { data: { orgId, uid } }: any = req
      const client: any = Client.findById(orgId);
      client.staffs = uid !== orgId ? client.staffs.filter((s: any) => s._id !== uid) : client!.staffs
      return client
    },

    account: async (root: any, args: any, { req }: { req: Request }) => {
      Auth.checkSignedIn(req)
      const { data: { orgId, uid } }: any = req
      return await Client.findById(orgId);
    },
    accDetails: async (root: any, args: any, { req }: { req: Request }) => {
      Auth.checkSignedIn(req)
      const { data: { orgId, uid } }: any = req
      const linkedAccounts = await Client.find({ linkedTo: orgId }).lean();
      const account = await Client.findById(orgId).lean()
      return {
        ...account, 
        linkedTo: linkedAccounts
      }
    },

    switchAccount: async (root: any, {id}: any, { req }: { req: Request }) => {
      console.log('hi')
      Auth.checkSignedIn(req)
      const { data: { orgId, uid } }: any = req
     
      let client = await Client.findById(id).lean()
      const linkedAccounts = await Client.find({ linkedTo: id }).lean();

      const signature = jwt.sign({
        orgId: client?._id.toString(),
        uid: client?._id.toString()
      },
        'crypto'
      )
      return ({
        token: `Bearer ${signature}`,
        client: {
          ...client, linkedTo: linkedAccounts
        }
      })
    },

    staffs: async (root: any, args: any, { req }: { req: Request }) => {
      Auth.checkSignedIn(req)
      const { data: { orgId, uid } }: any = req
      const { staffs } = await Client.findById(orgId) as any;
      return staffs
    },

    staff: async (root: any, { id }: { id: string }, { req }: { req: Request }) => {
      Auth.checkSignedIn(req)
      const { data: { orgId, uid } }: any = req
      const { staffs } = await Client.findById(orgId) as any;
      return id ? staffs.find((s: any) => s._id.toString() === id) : staffs.find((s: any) => s._id.toString() === uid)
    },
  },
  Mutation: {
    signUp: async (root: any, { info }: any, { req }: { req: Request }) => {
      verifyPhoneNumber = true
      await cred.validateAsync(info);
      const { name, phone, password, msgToken } = info
      const newClient = await Client.create({ name, phone, password, msgTokens: [msgToken.trim()] });
      const signature = jwt.sign({
        orgId: newClient._id,
        uid: newClient._id
      },
        'crypto'
      )
      return ({
        client: newClient,
        token: `Bearer ${signature}`,
      })
    },
    addAccount: async (root: any, { input }: any, { req }: { req: Request }) => {
      Auth.checkSignedIn(req)
      verifyEmail = false;
      verifyPhoneNumber = false

      await addAccObject.validateAsync(input);

      const { name, username, address, curClientId } = input
      const { password, _id, phone, email } = await Client.findById(curClientId).lean() as any;
      const newClient = await Client.create({ name, username, phone, email, address, password, linkedTo: [_id.toString()] });

      await Client.findByIdAndUpdate(curClientId, { $addToSet: { linkedTo: newClient._id.toString() } });

      return newClient
    },

    signIn: async (root: any, { creds }: any, { req }: { req: Request }) => {
      return await Auth.attemptSignIn(creds);
    },

    saveInfo: async (root: any, { staff }: any, { req, res }: any, info: any) => {
      Auth.checkSignedIn(req)
      const { data: { orgId, uid } } = req
      let client: any = {}
      let updated = null

      if (!staff._id) {
        client = await Client.findByIdAndUpdate(orgId,
          {
            $push: { staffs: staff }
          },
          { new: true }
        ).lean()
        updated = client.staffs[client.staffs.length - 1]

        await Invoice.updateMany(
          {
            modifier: req.data.orgId
          },
          {
            $push: { seen: { usr: updated._id } }
          }
        )
        await Expense.updateMany(
          {
            modifier: req.data.orgId
          },
          {
            $push: { seen: { usr: updated._id } }
          }
        )

      } else {
        client = await Client.findById(req.data.orgId)
        client!.staffs = client!.staffs.map((s: any) => (s._id.toString() === staff._id.toString()) ? staff : s)
        await Client.findByIdAndUpdate(req.data.orgId, { staffs: client.staffs }, { new: true })
        updated = staff
      }
      return updated
    },
    // updateAccount: async (root: any, { input }: any, { req }: any) => {
    //   console.log(input)
    //   Auth.checkSignedIn(req);
    //   const { data: { orgId } }: any = req
    //   return await Client.findByIdAndUpdate(orgId, { ...input }, { new: true })
    // },

    deleteStaff: async (root: any, { id }: { id: string }, { req }: any, info: any) => {
      Auth.checkSignedIn(req)
      const { data: { orgId } }: any = req
      let { staffs } = await Client.findById(orgId) as any;
      staffs = staffs.filter((s: any) => s._id.toString() !== id)
      await Client.findByIdAndUpdate(req.data.orgId, { staffs }, { new: true })
      return { id }
    }
  }
}
