import { User } from "../models/index.js"
import bcrypt from 'bcrypt'
import  jwt  from 'jsonwebtoken'
const login = async ({ email, password }) => {

    let existingUser = await User.findOne({ email }).exec()
    if (!existingUser) {
        throw new Error("Wrong email")
    } else {
        const isMatched = await bcrypt.compare(password, existingUser.password)
        if (isMatched) {
            //JWT
            let token = jwt.sign({
                data: existingUser,
            }, 
            process.env.JWT_SECRET,
            {expiresIn: '1 day'}
            )
            debugger

            return {
                ...existingUser.toObject(),
                password: 'Not show',
                token: token
            }
        } else {
            throw new Error("Wrong password")
        }
    }
}

const register = async ({
    name, email, password, phoneNumber, address
}) => {
    try {
        let existingUser = await User.findOne({ email }).exec()
        if (!!existingUser) {
            throw new Error('Email is existing')
        }
        // const isMatched = await  bcrypt.compare(password, existingUser.password)
        const hashPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUND))
        const newUser = await User.create({
            name,
            email,
            password: hashPassword,
            phoneNumber,
            address
        })
    } catch (error) {
        throw new Error("Cann't register user")
    }
}


export default { login, register }