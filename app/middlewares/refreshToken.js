
const jwt =require('jsonwebtoken')
const UserModal =require("../api/users/modal")
const responseBody =require("../helpers/responseBody")


const tokenHandler = async (req, res) => {
    try {
        const refreshToken = req.cookies.jwt;
        console.log(refreshToken)
        if (!refreshToken) return responseBody(401, 'fail', { message: 'User Unauthorized' }, res);
        // const refreshToken = cookies.jwt;
        
        const user = await UserModal.findAll({
            where: { 
                refreshToken : refreshToken
            } 
        });
        if (!user) return responseBody(403, 'fail', { message: 'Forbidden for user' }, res);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403)
            const username = {name: user.name};
            const useremail = { email: user.email };
            const accessToken = jwt.sign({username,useremail}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20s' })
            //const accessToken = generateAccesToken({ name: user.name });
            //console.log(accessToken)
            res.json({ accessToken });
        });
    } catch(error) {
        // responseBody(403, 'fail', { message: 'Forbidden for user' }, res);
        console.log(error)
    }
}
module.exports={tokenHandler}