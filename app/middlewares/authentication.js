import jwt from 'jsonwebtoken'

const authentication = (req, res, next) => {
  const token = req.headers.authorization

  try {
    jwt.verify(token, process.env.TOKEN, (error, user) => {
      if (error) throw error
      req.user = user
      console.log(req.user);

      next()
    })
  } catch(e) {
    res.status(403).json({
      status: 'fail', message: `${e.name}: ${e.message}`
    })
  }
}

export default authentication