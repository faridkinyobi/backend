
import Prodact from "./modal.js"


export const getProduct = async  (req , res) =>{
    try {
        const raspon = await Prodact.findAll();
        res.json(raspon);
    } catch (error) {
        console.log(error.message)
    }
    
}
export const getProductById = async (req , res) =>{
    try {
        const   {id} =req.params
        const raspon = await Prodact.findOne({
            where:{
                    id:id
            }    
        });
        res.json(raspon);
    } catch (error) {
        console.log(error.message)
    }
}
export const createProduct = async (req, res) => {
  try {
    const { name, harga, jenis} = req.body;
    // Lakukan validasi data sesuai kebutuhan

    // Buat produk baru menggunakan model Product
    const product = await Prodact.create({
      name,
      harga,
      jenis,
      foto: req.file.path
    });
    console.log(product)
    res.status(201).json({ success: true, message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create product', error });
  }
};
// export const createProduct  = async (req , res) =>{
//   // console.log(req.file.filename)
//         // if(!req.file)return res.status(400).json({msg:"no file uploaded"})

//         // // // Mendapatkan data dari permintaan (request)
//         const { name, harga, jenis } = req.body;
//         // // const Img = req.file.path
//         try {
//           // Membuat produk baru menggunakan metode create pada model Product
//           const newProduk = await Product.create({
//             name: name,
//             harga: harga,
//             jenis: jenis
//           });
//           // Mengirimkan respons dengan produk yang baru dibuat
//           res.status(201).json({
//             msg: "product created Success",
//             data:newProduk
//           })
//         } catch (error) {
//           // Menangani kesalahan jika terjadi
//           // res.status(404).json({ 
//             console.log(error.message)
//           // });
//         }   

//     // if(req.files==null)return res.status(400).json({msg:"no file uploaded"})

//     // const name = req.body;
//     // const harga = req.body;
//     // const jenis = req.body;
//     // const file = req.files.file;
//     // const fileSize = file.data.length;
//     // const ext = path.extname(file.name);//extends
//     // const fileName = file.md5 + ext; //nama file di conver md5
//     // const url =`${req.protocol}://${req.get("host")}/image/${fileName}`;
//     // const allowedType =['.png','.jpg','.jpeg']


//     // file.mv(`../../public/image/${fileName}`, async(err)=>{
//     //     if(err)return res.status(500).json({msg:err.message});

//     //     try {
//     //         await Prodak.create({
//     //             name:name,
//     //             Img:fileName,
//     //             url:url,
//     //             harga:harga,
//     //             jenis:jenis,
//     //         });
//     //         res.status(201).json({msg: "product created Success"})
//     //     } catch (error) {
//     //         console.log(error.message)
//     //     }
//     // })
// }

export const updateProduct  = (req , res) =>{
    
}
export const deleteProduct  = (req , res) =>{
    
}