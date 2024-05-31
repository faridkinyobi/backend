const {Prodact} =require("./modal.js")
const fs =require("fs");
const {responseBody} =require("../../helpers/responseBody.js");

const getProduct = async (req, res) => {
  try {
    const respon = await Prodact.findAll();
    res.status(201).json({
      data: respon,
    });
  } catch (e) {
    responseBody(400, "fail", { message: "invalid" }, res);
  }
};
 const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const respon = await Prodact.findOne({
      where: {
        id: id,
      },
    });
    if (!respon) {
      throw new Error(`Tidak ada Kategori dengan id :  ${id}`);
    }
    res.status(200).json({
      data: respon,
    });
  } catch (e) {
    responseBody(400, "fail", { message: "invalid" }, res);
  }
};
 const createProduct = async (req, res) => {
  try {
    if (!req.file) {
      return responseBody(400, "fail", { message: "no file" }, res);
    }
    
    const { name, harga, jenis } = req.body;
    const produc = await Prodact.findAll();
    const duplicateName = produc.find((produc) => produc.name === name);
    if (duplicateName) {
      return responseBody(409, "Conflict", { message: "nama sudah ada!" }, res);
    }
    // Buat produk baru menggunakan model Product
    const product = await Prodact.create({
      name, 
      harga,
      jenis,
      foto: req.file.filename.replace(/\\/g, "/"),
    });
    responseBody(200, "success", { message: "Created successfully" }, res);
  } catch (e) {
    responseBody(400, "fail", { message: `${e.name}: ${e.message}` }, res);
  }
};
 const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, jenis, harga } = req.body;

    const product = await Prodact.findOne({
      where: {
        id: id,
      },
    });
    if (!product) {
      responseBody(
        409,
        "Conflict",
        { message: `Tidak ada Kategori dengan id : ${id}` },
        res
      );
    }
    const { foto } = product;
    if (req.file) {
      if (foto) {
        deleteImage(foto);
      }
      // Perbarui nama, harga, jenis, dan gambar produk
      const result = await Prodact.update(
        {
          name,
          harga,
          jenis,
          foto: req.file.filename.replace(/\\/g, "/"),
          // foto: req.file.path
        },
        { where: { id: id } }
      );
      const duplicateName = result.find((result) => result.name === name);
      if (duplicateName) {
        responseBody(409, "Conflict", { message: "nama sudah ada!" }, res);
      }
    } else {
      const result = await Prodact.update(
        {
          name,
          harga,
          jenis,
        },
        {
          where: { id: id },
        }
      );
      const duplicateName = result.find((result) => result.name === name);
      if (duplicateName) {
        responseBody(409, "Conflict", { message: "nama sudah ada!" }, res);
      }
    }
    responseBody(200, "success", { message: "Update successfully" }, res);
  } catch (e) {
    responseBody(404, "fail", { message: "not found" }, res);
  }
};
 const deleteImage = (filename) => {
 
  try {
    // Variabel nama file
    const filePath = `public/foto/${filename}`;

    // Hapus file menggunakan fs.promises.unlink
    fs.unlink(filePath, (err) => {
      if (err) {    
        res.status(400).error(err);
        return; 
      }
    });
  } catch (err) {
    throw new Error(`Gagal menghapus gambar: ${err.message}`);
  }
};
 const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Cari data produk berdasarkan ID
    const product = await Prodact.findByPk(id);
    if (!product) {
      throw new Error(`Tidak ada Kategori dengan id : ${id}`);
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
    responseBody(200, "success", { message: "Delete successfully" }, res);
  } catch (e) {
    responseBody(404, "fail", { message: "not found" }, res);
  }
};
module.exports={
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteImage,
  deleteProduct,
}