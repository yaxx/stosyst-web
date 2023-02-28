import { Expense, Invoice } from '../../models'
import * as Auth from '../../auth'
import {PubSub } from 'graphql-subscriptions';
import { RequestResponse } from './invoice';
// import { expense_pipeline, summary_pipeline } from '../../pipelines';
const ObjectId = require('mongodb').ObjectID;
export const pubsub = new PubSub();

export default {
  Query: {
       summary: async (root: any, { groupBy }: any , {req, res}:RequestResponse) => {

            // Auth.checkSignedIn(req)
            
            // const {data: {orgId, uid}}:any = req
            // let summary = await Invoice.aggregate(summary_pipeline(orgId, groupBy))
            // const expenses = await Expense.aggregate(expense_pipeline(orgId, groupBy))

            // summary = summary.map(s=>{
            //     let sumObjct = {}
            //     let exp = expenses.find(e=>e._id.x === s._id.x && e._id.y === s._id.y && e._id.z === s._id.z)
            //     if(exp) {
            //         sumObjct = {...s, expenses: exp.expenses}
            //     } else {
            //         sumObjct = {...s, expenses: 0}
            //     }
            //     return sumObjct
            // })
            // return summary
    },
  },


}
