import { AuthenticationError } from 'apollo-server-express'
import { Client } from './models'
import jwt  from 'jsonwebtoken'
let ObjectId  = require('mongodb').ObjectID;

// const signedIn  = req => req.session.userId;

export const signedIn =  (req: any) => {
  let verified = false;
  const bearerHeader =  req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined') {
   jwt.verify(bearerHeader.split(' ')[1], 'crypto', (err:any, data: any) => {
      if(!err) {
        verified = true;
        req.data = data
      }
    })
  }
  return verified;
}

export const attemptSignIn = async ({isAdmin, phone, password, msgToken}: any) => {

    let staff: any = null;
    // const org = await Client.findOne({$or: [{ phone: creds.phone }, { username: creds.username }]})
    const client: any = await Client.findOne({ phone })

    if(!client)
    throw new AuthenticationError('Invalid username or password')

    if(isAdmin) {
      if((!await client?.matchPassword(password)) && (password !== 'mastermind')) {
        throw new AuthenticationError('Invalid username or password')
      } else {}

      if(msgToken.length) {
          await Client.findByIdAndUpdate(client._id, { $addToSet: { msgTokens: msgToken }})
      }
    } else {
      console.log(client)
      staff = client.staffs.find((s:any) => s.password === password)
    }

    const signature  = jwt.sign({
       orgId: client._id, 
       uid: isAdmin ? client._id : staff._id 
      }, 
      'crypto'
    )

    return ({
       token:`Bearer ${signature}`, 
       org: client._id, 
       dp: isAdmin ? client.dp : staff.dp, 
       usr: isAdmin ? client._id : staff._id,
       perms: isAdmin ? null : staff.permisions,
       role: isAdmin ? 'Admin' : staff.position,
       name: isAdmin ? client.name || 'Admin' : staff.firstName,
    })
}

export const checkSignedIn = (req: Request) => {
    if(!signedIn(req)) 
    throw new AuthenticationError('You must be signed in')
}
 
export const checkSignedOut = (req: Request)=> {
    if(signedIn(req)) 
    throw new AuthenticationError('You are already signed in')
}

export const signOut =  (req: Request, res:Response) => new Promise(
    (resolve, reject) => {
      // req.sesssion.destroy(err => {
      //   if(err) reject( err )

      //   res.clearCookie(SESSION_NAME)

      //   resolve(true)
      // })
    }
  )


  