import jwt from 'jsonwebtoken'
import responseBody from '../helpers/responseBody.js';

const authentication = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const accessToken = token.split(' ')[1];

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
      if (error) throw error
      req.user = user
      // console.log(req.user);

      next()
    })
  } catch(e) {
    responseBody(403, 'fail', { message: `${e.message}` }, res);
  }
}

export default authentication