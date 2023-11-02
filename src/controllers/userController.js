import { body, validationResult } from 'express-validator'
import { userRepositories } from '../repositories/index.js'
import { EventEmitter } from 'node:events'

const myEvent = new EventEmitter()
//listen
myEvent.on('event.register.user', (params) => {
    console.log(`They talker about: ${JSON.stringify(params)}`)
})
const login = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body
    // Dung user repo
    try {
        let existingUser = await userRepositories.login({ email, password })
        res.status(200).json({
            message: "Login successfuly",
            data: existingUser
        })
    } catch (error) {
        res.status(401).json({
            message: error.message,

        })
    }

}

const register = async (req, res) => {
    // validate
    // to do
    // Dung repo
    const { name, email, password, phoneNumber, address } = req.body
    try {
        const user = await userRepositories.register({ name, email, password, phoneNumber, address })
        res.status(201).json({
            message: "Create done",
            User: [
                {
                    name: name,
                    email: email,
                    phoneNumber: phoneNumber,
                    address: address
                }
            ]
        })
    } catch (error) {
        res.status(500).json({
            message: "Error"
        })
    }
}

const getAllUser = async (req, res) => {
    res.send('Get all users')
}

export default { login, register, getAllUser } 
