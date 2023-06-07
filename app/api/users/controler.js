import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserModal from "./modal.js"

export const getUser = async (req , res) =>{
    try {
        const users = await UserModal.findAll()
        res.status(200).json({
        data: users,
        metadata: "test user endpoint"
    })
    } catch (e) {
        res.status(400).json({
        error: "invalid"
        })
    }
}
export const getUserById = (req , res) =>{
    
}
export const createUser  = async(req , res) =>{
}
export const updateUser  = (req , res) =>{
    
}
export const deleteUser  = (req , res) =>{
    
}

export const register = async (req, res) => {
    const { name, email, password } = req.body
    
    try {
        const user = await UserModal.findAll()
        const duplicateName = user.find((user) => user.name === name)

        if (duplicateName) {
            res.status(409).json({
                status: 'fail', message: 'name duplicate'
            })
        } else {
            const hashPaswword = await bcrypt.hash(password, 10);

            const result = await UserModal.create({
                name,
                email,
                password: hashPaswword
            })

            res.status(201).json({
                status: 'success', message: 'register successfully', data: { id: result.dataValues.id }
            })
        }

    } catch (e) {
        res.status(400).json({
            status: 'fail', message: `${e.name}: ${e.message}`
        })
    }
}

export const loginAuth = async (req, res) => {
    const { email, password } = req.body
    
    try {
        const foundUser = await UserModal.findOne({
            where: { email }
        })
        
        const user = foundUser.dataValues;
        
        if (!user) {
            res.status(401).json({
                status: 'fail', message: 'user not found'
            })
        }

        const match = await bcrypt.compare(password, user.password);

        if (match) {
            const username = { name: user.name };
            const token = jwt.sign(username, process.env.TOKEN, { expiresIn: '24h' });

            res.status(200).json({
                status: 'success', token
            })
        } else {
            res.status(401).json({
                status: 'fail', message: 'user not found'
            })
        }
    } catch(e) {
        res.status(404).json({
            status: 'fail', message: 'user not found!'
        })
    }
}
