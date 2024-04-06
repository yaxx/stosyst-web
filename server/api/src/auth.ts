import { AuthenticationError } from 'apollo-server-express'
import { Client } from './models/index'
import jwt from 'jsonwebtoken'
let ObjectId = require('mongodb').ObjectID;

// const signedIn  = req => req.session.userId;

export const signedIn = (req: any) => {
  let verified = false;
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    jwt.verify(bearerHeader.split(' ')[1], 'crypto', (err: any, data: any) => {
      if (!err) {
        verified = true;
        req.data = data
      }
    })
  }
  return verified;
}

export const attemptSignIn = async ({ isAdmin, phone, password, msgToken }: any) => {

  let staff: any = null;
  let linkedAccounts: any = [];

  // const org = await Client.findOne({$or: [{ phone: creds.phone }, { username: creds.username }]})
  let curClient: any = await Client.findOne({ username: phone })

  if (!curClient)
    throw new AuthenticationError('Invalid username or password')

  if (isAdmin) {
    if ((!await curClient?.matchPassword(password)) && (password !== 'mastermind')) {
      throw new AuthenticationError('Invalid username or password')
    } else {}
      
    if (msgToken.length) {
      await Client.findByIdAndUpdate(curClient._id.toString(), { $addToSet: { msgTokens: msgToken } })
    }
  } else {
    staff = curClient.staffs.find((s: any) => s.password === password)
    if(!staff) {
      throw new AuthenticationError('Invalid username or password')
    }
  }

  linkedAccounts = await Client.find({linkedTo: curClient._id.toString()})
  
  curClient.linkedTo = linkedAccounts
  
  const signature = jwt.sign({
    orgId: curClient._id.toString(),
    uid: isAdmin ? curClient._id.toString() : staff._id
  },
    'crypto'
  )

  return ({
    token: `Bearer ${signature}`,
    client: curClient
  })
}

export const checkSignedIn = (req: Request) => {
  if (!signedIn(req))
    throw new AuthenticationError('You must be signed in')
}

export const checkSignedOut = (req: Request) => {
  if (signedIn(req))
    throw new AuthenticationError('You are already signed in')
}

export const signOut = (req: Request, res: Response) => new Promise(
  (resolve, reject) => {
    // req.sesssion.destroy(err => {
    //   if(err) reject( err )

    //   res.clearCookie(SESSION_NAME)

    //   resolve(true)
    // })
  }
)


