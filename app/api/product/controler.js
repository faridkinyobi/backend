
import Prodact from "./modal.js"
import fs from 'fs';
import responseBody from "../../helpers/responseBody.js";


export const getProduct = async  (req , res, next) =>{
    try {
        const respon = await Prodact.findAll();
        res.status(201).json({ 
          data:respon
        });
    } catch (error) {
      next(error)
    }
    
}
export const getProductById = async (req , res, next) =>{
    try {
        const {id} =req.params
        const respon = await Prodact.findOne({
            where:{
              id:id,
            }    
        });
        if (!respon) {
          throw new Error(`Tidak ada Kategori dengan id :  ${id}`);
        }
        res.status(200).json({
          data:respon,
      });
    } catch (error) {
        next(error)
    }
}
export const createProduct = async (req, res, next) => {
  try {
    if(!req.file) return res.status(400).json({msg:"no file"})
    const { name, harga, jenis} = req.body
    const produc = await Prodact.findAll()
    const duplicateName = produc.find((produc) => produc.name === name || produc.foto === foto);
    if(duplicateName){
      responseBody(409, "Conflict", { message: "nama sudah ada!" }, res);
    }
    // Buat produk baru menggunakan model Product
    const product = await Prodact.create({
      name,
      harga,
      jenis,
      foto: req.file.filename.replace(/\\/g, '/')
    });
    res.status(201).json({ 
      date:product,
      status:true,
      message: 'Product created successfully'});
  } catch (error) {
    next(error)
  }
}
export const updateProduct = async (req, res) => {
  try {
    const   {id} =req.params
    const {name,jenis,harga} =req.body
    

    const product = await Prodact.findOne({
        where:{
          id:id
        }    
    });
    if(!product){
      responseBody(409, "Conflict", { message: `Tidak ada Kategori dengan id : ${id}` }, res);
    }
    const { foto} = product
    if(foto){
      deleteImage(foto)
    }
    // Perbarui nama, harga, jenis, dan gambar produk
    const result = await Prodact.update(
      { name,
        harga, 
        jenis, 
        foto: req.file.path },
      { where: { id:id } 
    })
    const duplicateName = result.find((result) => result.name === name || result.foto === foto);
    if(duplicateName){
      responseBody(409, "Conflict", { message: "nama sudah ada!" }, res);
    }
    res.status(200).json({
      data:result,
      message: "Produk berhasil diperbarui", 
      });
  } catch (error) {
    console.log(error)
  }
}
export const deleteImage = (filename) => {
  // variabl nama file
  const filePath = `${filename}`;
  
  // Hapus file dengan menggunakan fs.unlink
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Cari data produk berdasarkan ID
    const product = await Prodact.findByPk(id);
    if(!product){
      throw new Error(`Tidak ada Kategori dengan id : ${id}`)
    }

    const { foto } = product;

    // Hapus gambar terlebih dahulu
    if (foto) {
      deleteImage(foto);
    }
    //Hapus data produk dari database
    await Prodact.destroy({
      where: { id },
    });
    res.status(200).json({ 
      status:true,
      message: 'Produk berhasil dihapus' });
  } catch (error) {
    next(error)
  }
};
