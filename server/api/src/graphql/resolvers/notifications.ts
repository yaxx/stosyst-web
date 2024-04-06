
import * as Auth from '../../auth'
import { Invoice, Expense } from '../../models/index'
// import {group_criteria, sort_order } from './expense'
import { RequestResponse } from './invoice';

const ObjectId = require('mongodb').ObjectID;


export default {
  Query: {
    notifications: async (root:any, { page, offset }: any, {req, res}: RequestResponse ) => {
    
        Auth.checkSignedIn(req);
        const {data: {orgId, uid}}:any = req
        const conditions = {
            modifier: orgId, 
            'added._id': {
                $not: { 
                    $eq: uid
                }
            }
        }
        const unread = {
            modifier: orgId, 
            seen: {
                $not: {
                    $elemMatch: {
                        usr: uid
                    }
                }
            }
        }

        const invoices = await Invoice.aggregate([
            {
                $match: conditions
            },
            // {
            //     $group: group_criteria
            // },
            // {
            //     $sort: sort_order
            // },
            {
                 $skip: offset 
            },
            { 
                $limit: 20 
            }
        ])

        const expenses = await Expense.aggregate([
            {
                $match: conditions
            },
            // {
            //     $group: group_criteria
            // },
            // {
            //     $sort: sort_order
            // }
        ])

        const unreadInvoices = await Invoice.find(unread).countDocuments()

        const unreadExpenses = await Expense.find(unread).countDocuments()

        return {
            invoices, 
            expenses,
            unreadInvoices,
            unreadExpenses
        }
    }
  },
  Mutation: {
    clearNotifications: async (_: any, { page }: any, { req, res}:RequestResponse) => {

      Auth.checkSignedIn(req)
      
      const {data: {orgId, uid}}:any = req
      let i = null
      if(page === '/invoices') {
         i = await Invoice.updateMany(
            {
                modifier: orgId, 
                seen: {
                    $not: {
                        $elemMatch:{
                            usr: uid
                        }
                    }
                } 
            }, 
            {
                $push: { 
                    seen: { 
                        usr: uid 
                    }
                }
            }, 
            {
                new: true
            }
        )

      } else {
         i = await Expense.updateMany(
            {
                modifier: orgId, 
                seen: {
                    $not: {
                        $elemMatch:{
                            usr: uid
                        }
                    }
                } 
            }, 
            {
                $push: { 
                    seen: { 
                        usr: uid 
                    }
                }
            }, 
            {
                new: true
            }
        )
      }
      return { cleared: true }
    }
  }
}
