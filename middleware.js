const jwt = require('jsonwebtoken')
require('dotenv').config({path:'./.env'})
const JWT_SECRET = process.env.JWT_SECRET

const authMiddlware = (req,res,next)=>{
    const token = req.headers.authorization
    const split = token.split(' ')
    const mainToken = split[1]
    jwt.verify(mainToken,JWT_SECRET,(err,decoded)=>{
        if(err){
            res.status(404).json({
                message:'Not authorized'
            })
            return;
        }
        req.userId = decoded.userId
        next()
    })
}

module.exports = authMiddlware