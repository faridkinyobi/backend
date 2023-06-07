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
