import mongoose, {ObjectId, Schema} from 'mongoose'
import isEmail from 'validator/lib/isEmail.js'
export default mongoose.model('User', 
    new Schema({
        id: {type: ObjectId},
        name: {
            type: String,
            required: true,
            validate: {
                validator: (name) => name.length > 3,
                message: "User'length > 3"
            }
        },
        email: {
            type: String,
            validate: {
                validator: (email) => isEmail(email),
                message: 'Email is incorrect format'
            },
            message: "Email is incorrect format"
        },
        password: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true
        },
        addresss: {
            type: String,
            required: false
        }
    })
)