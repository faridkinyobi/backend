import jwt from 'jsonwebtoken'

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
    res.status(403).json({
      status: 'fail', message: `${e.name}: ${e.message}`
    })
  }
}

export default authentication