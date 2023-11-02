import mongoose from "mongoose"
const connect = async () => {
    try {
        let connection = await mongoose.connect(process.env.MONGO_URI)
        console.log('Connect mongoose successfull')
        return connection
    } catch(error) {
        const {code} = error
        if(code == 8000) {
            throw new Error('Wrong usename or password')
        }
    }
}
export default connect