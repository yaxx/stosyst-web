import mongoose from 'mongoose'
import { compare, hash } from 'bcryptjs'

const Schema = mongoose.Schema

const ClientSchema = new Schema({
    password: String,
    username: {
        type: String,
        validate: {
            validator:  (username: String) => {
                let C: any = Client
               return C.dontExist({ username })
            },
            message: ({ value }:{value: String}) => `${value} has already exist`
        }
    },
    email: {
        type: String,
        validate: {
            validator:  (email:String) => {
                let C: any = Client
                return C.dontExist({ email })
            },
            message: ({ value }:{value: String}) => `${value}  already exist`
        }
    },
    phone: {
        type: String,
        validate: {
            validator: (phone:String) => {
                let C: any = Client
                return C.dontExist({ phone })
            },
            message: ({ value }:{value: String}) => `${value} already exist`
        }
    },
    country: {
        type: String, 
        default: ''
    },
    city: {
        type: String, 
        default: ''
    },
    address: String,
    banner: {
        type: String, 
        default: 'd063578d-733d-4aca-8809-e18368d55184'
    },
    dp: {
        type: String, 
        default: 'a35f9e5f-771c-4afd-b4b7-0869842c8dc9',
    },
    name: {
        type: String, 
        default: ''
    },
    category: {
        type: String, 
        default: ''
    },
    staffs: [{
        firstName: String,
        lastName: String,
        department: { 
            type: String, 
            default: '' 
        },
        position: { 
            type: String, 
            default: '' 
        },
        phone: { 
            type: String, 
            default: '' 
        },
        email: {
             type: String, 
             default: '' 
        },
        address: {
             type: String,
             default: '' 
        },
        username: {
            type: String, 
            default: '' 
        },
        password: String,
        dp: {
            type: String, 
            default: ''
        },
        banner: {
            type: String, 
            default: ''
        },
        permisions: {
            creates: ['stocks', 'invoices', 'expenses'],
            edits: ['stocks', 'invoices', 'expenses'],
            deletes: ['stocks', 'invoices', 'expenses']
        },
        createdAt: {
             type: Date, 
             default: Date.now() 
        }
    }],
    msgTokens:[]

}, { timestamps: true } )

ClientSchema.statics.dontExist =  async function(options) {
    return await this.where(options).countDocuments() === 0
}

ClientSchema.methods.matchPassword = function(password: string) {
    return compare(password, this.password)
}

ClientSchema.pre('save', async function () {
    if(this.isModified('password')) {
        this.password = await hash(this?.password||'', 10) as any
    }
})

const Client = mongoose.model('Client', ClientSchema);

export default Client;