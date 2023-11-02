import mongoose, {ObjectId, Schema} from 'mongoose'
import isEmail from 'validator/lib/isEmail.js'
export default mongoose.model('Student', 
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
            required: true,
            message: "Email is incorrect format"
        },
        languages: {
            type: [String]
        },
        gender: {
            type: String,
            enum: {
                values: ['Male', 'Female']
            },
            require: true
        },
        phoneNumber: {
            type: String,
            required: true,
            validator: (phoneNumber) => phoneNumber.length > 5
        },
        addresss: {
            type: String,
            required: false
        }
    })
)