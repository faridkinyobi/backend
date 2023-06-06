
import Prodact  from "../model/prodacmodal.js"
import path from 'path'

export const getProduct = async  (req , res) =>{
    try {
        const raspon = await Prodact.findOne();
        res.json(raspon);
    } catch (error) {
        console.log(error.message)
    }
    
}
export const getProductById = async (req , res) =>{
    try {
        const raspon = await Prodact.findAll({
            where:{
                id: req.params.id
            }
        });
    } catch (error) {
        console.log(error.message)
    }
}
export const createProduct  = (req , res) =>{
    if(req.files==null)return res.status(400).json({msg:"no file uploaded"})
    const{name,harga,jenis}= req.body;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);//extends
    const fileName = file.md5 + ext; //nama file di conver md5
    const url =`${req.protocol}://${req.get("host")}/images ${fileName}`;
    const allowedType =['.png','.jpg','.jpeg']

    if(!allowedType.includes(ext.toLowerCase()))return res.status(422).json({msg:"invalid images"})
    if(fileSize>5000000)return res.status(422).json({msg: "images harus lebih kecil 5MB"})
    
    file.mv(`../../public/image/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg:err.message});
        try {
            await Prodak.create({
                name,
                image:fileName,
                url:url,
                harga,
                jenis,
            });
            res.status(201).json({msg: "product created Success"})
        } catch (error) {
            console.log(error.message)
        }
    })
}

export const updateProduct  = (req , res) =>{
    
}
export const deleteProduct  = (req , res) =>{
    
}