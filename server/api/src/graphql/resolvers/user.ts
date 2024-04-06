import { User } from '../../models/index'
import * as Auth from '../../auth'
import jwt from 'jsonwebtoken'



export default {
  Query: {
    user: async (root: any, args: any, { req }: { req: Request }) => {
      Auth.checkSignedIn(req)
      const { data: { accNumber, } }: any = req
      return await User.findOne({ 'account.number': accNumber });
    },
  },
  Mutation: {
    signUp: async (root: any, { signUpInfo }: any, { req }: { req: Request }) => {
      // await SignUpScheema.validateAsync(signUpInfo);
      const { firstName, phone, password } = signUpInfo

      const newUser: any = await User.create(
        { 
          firstName, 
          phone, 
          password, 
          account:{
            number: phone,
            balance: 0.00
          } 
        }
      );
      const signature = jwt.sign(
        {accNumber: newUser.account.number}, 'crypto'
      )
      return ({
        user: newUser,
        token: `Bearer ${signature}`,
      })
    },

    signIn: async (root: any, { singInInfo }: any, { req }: { req: Request }) => {
      return await Auth.attemptSignIn(singInInfo);
    },

  }
}
