const {Saran} =require("./model.js");
const {responseBody} =require("../../helpers/responseBody");

 const getSaran = async (req, res) => {
  try {
    const penilaan = await Saran.findAll();
    res.status(200).json({
      data: penilaan,
    });
  } catch (e) {
    responseBody(400, "fail", { message: "invalid" }, res);
  }
};

 const getSaran2 = async (req, res, next) => {
  try {
    const penilaan = await Saran.findAll({
      attributes: ["name", "pesan"],
      where: {
        status: true // Menampilkan hanya data dengan status true
      }
    });
    res.status(200).json({
      data: penilaan,
    });
  } catch (e) {
    responseBody(400, "fail", { message: "invalid" }, res);
  }
};

 const getSaranById = async (req, res) => {
  try {
    const { id } = req.params;
    const penilaan = await Saran.findOne({
      where: {
        id: id,
      },
    });
    res.status(201).json({
      data: penilaan,
    });
  } catch (e) {
    responseBody(400, "fail", { message: "invalid" }, res);
  }
};

 const createSaran = async (req, res) => {
  try {
    const { name, email, alamat, pesan } = req.body;
    await Saran.create({
      name,
      email,
      alamat,
      pesan,
      status:false
    });
    responseBody(200, "success", { message: "Created successfully" }, res);
  } catch (e) {
    responseBody(400, "fail", { message: `${e.name}: ${e.message}` }, res);
  }
};

const updateSaran = async (req, res) => {
  try {
    const { id } = req.params;
    const saran = await Saran.findOne({
      where:{
        id:id
      }
    });
    if (!saran) {
      throw new Error(`Tidak ada Saran dengan nama : ${name}`);
    } 

    // Mengubah status boolean
    const newStatus = !saran.status;

    const updatedRows = await Saran.update(
      { status: newStatus  },
      { where: { id: id } }
    );

    if (updatedRows === false) {
      throw new Error(`Tidak ada Saran dengan name : ${name}`);
    }

    responseBody(200, "success", { message: "Update successfully" }, res);
  } catch (e) {
    responseBody(404, "fail", { message: "not found" }, res);
  }
};

const deleteSaran = async (req, res) => {
  try {
    const { id } = req.params;
    const saran = await Saran.findOne({
      where: {
        id: id,
      },
    });
    await saran.destroy({
      where: { id },
    });
    responseBody(200, "success", { message: "Delete successfully" }, res);
  } catch (error) {
    responseBody(404, "fail", { message: "not found" }, res);
  }
};

module.exports={
  getSaran,
  getSaran2,
  getSaranById,
  createSaran,
  updateSaran,
  deleteSaran
}