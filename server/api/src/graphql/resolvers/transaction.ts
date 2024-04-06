import {Transaction } from '../../models/index'
// import { scheema } from '../../validator'
import * as Auth from '../../auth'
// import { TransactionSchema } from '../../validator/schemas'

export default {
    Query: {
        transactions: async (root: any, args: any, { req }: { req: Request }) => {
            Auth.checkSignedIn(req)
            const { data: { accNumber } }: any = req
            const trans = await Transaction.find({ from: accNumber, to: accNumber });
            return trans;
        },
    },
    Mutation: {
        execTransaction: async (root: any, { info }: any, { req }: { req: Request }) => {
            Auth.checkSignedIn(req)
            // await TransactionSchema.validateAsync(info);
        },
    }
}
