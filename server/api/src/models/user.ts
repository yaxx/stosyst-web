

import mongoose from 'mongoose'
import { compare, hash } from 'bcryptjs'

const Schema = mongoose.Schema

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    dp: String,
    phone: {
        type: String,
        validate: {
            validator: (phone: String) => {
                let Usr: any = User
                return Usr.dontExist({ phone })
            },
            message: ({ value }: { value: String }) => `${value} already exist`
        }
    },
    password: String,
    account: 
        {
            number: String,
            balance: Number,
            type: {type: String, default:'savings'},
        },

}, { timestamps: true })

UserSchema.statics.dontExist = async function (options) {
    return await this.where(options).countDocuments() === 0
}

UserSchema.methods.matchPassword = function (password: string) {
    return compare(password, this.password)
}

UserSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await hash(this?.password || '', 10) as any
    }
})

const User = mongoose.model('User', UserSchema);

export default User;
