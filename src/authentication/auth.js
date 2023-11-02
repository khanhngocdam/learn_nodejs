import jwt from 'jsonwebtoken'
const checkToken = (req, res, next) => {
    debugger
   if(req.url == '/users/login' || req.url == '/users/register' || req.url == '/' || req.url=='') {
    next()
        return
   } 
   //get and validate token
   const token = req.headers?.authorization?.split(' ')[1]
   try {
        const jwtObject = jwt.verify(token, process.env.JWT_SECRET)
        const isExpired = Date.now() >= jwtObject.exp * 1000
        if(isExpired) {
            res.status(401).json({
                message: "Token is expired"
            })
        } else {
            next()
        }
   } catch(error) {
        res.status(401).json({
            message: error.message
        })
   }
}
export default checkToken