
const jwt = require('jsonwebtoken')
const {responseBody} =require('../helpers/responseBody')

const authentication = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const accessToken = token.split(' ')[1];
    if(accessToken==null) return res.sendStatus(401)
    
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
      if (error) throw error
      req.user = user
    

      next()  
    })
  } catch(e) {
    responseBody(403, 'fail', { message: `${e.message}` }, res);
  }
}
module.exports={
  authentication
}
