import { Expense } from '../../models'
import { Client } from '../../models'
import * as Auth from '../../auth'
// import {PubSub, withFilter } from 'graphql-subscriptions';
import { RequestResponse } from './invoice';
import { getExpensePipeline } from '../../pipelines';
const ObjectId = require('mongodb').ObjectID;
// export const pubsub = new PubSub();

const EXPENSE = "EXPENSE"

export const  toTitleCase = (str: string) => {
  let s =  str.toLocaleLowerCase().split(' ')
  return s.map((s: any)=> s.charAt(0).toUpperCase() + s.slice(1)).join(' ')
}

export default {
  Query: {
    expenses: async (root: any, { query, group, offset }: any , {req, res}:RequestResponse) => {
      Auth.checkSignedIn(req)

      const {data: {orgId}}:any = req

      let expenses: any = await Expense.aggregate(getExpensePipeline(orgId, query, group, offset) as any)

      expenses =  group === 'date' ? 
      expenses.map((r: any)=>({
        ...r, _id: r.records[0].createdAt
      })) 
      : group === 'spender' || group === 'name' ?
      expenses.map((r: any)=>({
        ...r, _id: toTitleCase(r._id)
      }))  
      :
      expenses

      return expenses
    }
  },

  Mutation: {
    saveExpense: async (_:any, { expense }:any, { req, res}:RequestResponse) => {
      
      Auth.checkSignedIn(req)
      
      const {data: {orgId, uid}}:any = req

      const client: any = await Client.findById(orgId).lean()
      const staff: any = client.staffs.find((s: any) => s._id.toString() === uid)
      const isAdmin: boolean = orgId === uid 

      let user: any = isAdmin ? 
      ({
        _id: client._id,
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

      const exp = !expense._id ? 
      await Expense.create({
        ...expense, 
        added: user,
        modified: user,
        modifier: orgId,
        seen: [{usr: uid}]
      }) 
      : 
      await Expense.findByIdAndUpdate(ObjectId(expense._id), {
        ...expense,
        modified: user
      },
      { new: true }
      )
      // console.log(exp)
      // pubsub.publish(EXPENSE, { expense: exp } )
      return exp
    },
    deleteExpense: async (_: any, { id }: any) => {
        return await Expense.findByIdAndDelete(ObjectId(id))
    }
  },

  Subscription: {
    expense: {
      // subscribe: withFilter(
      //   () => pubsub.asyncIterator([EXPENSE]),
      //   ({ expense }, { org, usr }) => {
      //     return ((expense.modifier === org) && (usr.toString() !== expense.added._id.toString()))
      //   }
      // ) 
    }
  }
}
