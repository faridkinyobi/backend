
const jwt = require('jsonwebtoken')
const responseBody =require('../helpers/responseBody')


const verifyToken = (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        const accessToken = token && token.split(' ')[1];
        if(accessToken==null) return res.sendStatus(401)

        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
            if (error) return res.sendStatus(403);
            req.email = decoded.email
            next()
        })
    } catch(e) {
        responseBody(403, 'fail', { message: `${e.message}` }, res);
    }
}
module.exports={
    verifyToken
} 