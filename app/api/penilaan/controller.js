import Saran from "./model.js"

export const getSaran = async(req , res, next) =>{
    try {
        const penilaan = await Saran.findAll()
        res.status(201).json({ 
            data:penilaan
        });
    } catch (error) {
        next(error)
    }
}
export const getSaranById = async(req , res, next) => {
    try {
        const {id} =req.params
        const penilaan = await Saran.findOne({
            where:{
                id:id
            }
        })
        res.status(201).json({ 
            data:penilaan
        });
    } catch (error) {
        next(error)
    }
}
export const createSaran  = async(req , res,next) =>{
    try {
        console.log(req.body)
        const { name, email ,alamat,pesan }= req.body
        const saran = await Saran.create({
            name,email,alamat,pesan
        });
        res.status(200).json({
            data:saran,
            status:true,
            message: 'Product created successfully'
        })
    } catch (error) {
        next(error)  
    }
}

export const updateSaran  = async(req , res, next) =>{
    try {
        const   {id} =req.params
        const { name, email ,alamat,pesan }= req.body
        const sarans = await Saran.findOne({
            where:{
            id:id
            }    
        });
        if(!sarans){
        throw new Error(`Tidak ada Kategori dengan id : ${id}`)
        }
        const saran = await Saran.update({
            name,
            email,
            alamat,
            pesan
        },{ where: { id:id } })
        console.log(saran)
        res.status(200).json({
            data:saran,
            status:true,
            message: 'successfully'
        })
    } catch (error) {
        next(error)
    }
}
export const deleteSaran = async(req , res) =>{
    try {
        const {id} =req.params
        const saran = await Saran.findOne({
            where:{
                id:id
            }
        })
        if(!saran){
            throw new Error(`Tidak ada Kategori dengan id : ${id}`)
        }
        await saran.destroy({
            where: { id },
        });
        res.status(200).json({
            status:true,
            message: 'Produk berhasil dihapus'
        })
    } catch (error) {
        next(error)
        
    }
}