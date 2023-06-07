
import Prodact from "./modal.js"
import fs from 'fs'

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


export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, harga, jenis } = req.body;
    const { foto } = check;

    // Cari data produk berdasarkan ID
    const check = await Prodact.findByPk(id)
    if (!check) {
      throw new Error("Produk tidak ditemukan");
    }

    if (foto) {
      deleteImage(foto);
    }

    // Perbarui nama, harga, jenis, dan gambar produk
    const result = await Prodact.update(
      { name, harga, jenis, foto: req.file.path },
      { where: { id } }
    );

    res.status(200).json({ message: "Produk berhasil diperbarui", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan saat memperbarui kategori" });
  }
};

export const deleteImage = (filePath) => {
  fs.unlink(filePath, (error) => {
    if (error) {
      console.error('Terjadi kesalahan saat menghapus gambar:', error);
    } else {
      console.log('Gambar berhasil dihapus');
    }
  });
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Cari data produk berdasarkan ID
    const product = await Prodact.findByPk(id);
    if (!product) {
      throw new Error('Produk tidak ditemukan');
    }

    const { foto } = product;

    // Hapus gambar terlebih dahulu
    if (foto) {
      deleteImage(foto);
    }

    // Hapus data produk dari database
    await Prodact.destroy({
      where: { id },
    });

    res.status(200).json({ message: 'Produk berhasil dihapus' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan saat menghapus produk' });
  }
};
