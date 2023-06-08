import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModal from "./modal.js";
import responseBody from "../../helpers/responseBody.js";

export const getUser = async (req, res) => {
  try {
    const users = await UserModal.findAll();
    res.status(200).json({
      data: users,
      metadata: "test user endpoint",
    });
  } catch (e) {
    res.status(400).json({
      error: "invalid",
    });
  }
};
export const getUserById = (req, res) => {};
export const createUser = async (req, res) => {};
export const updateUser = (req, res) => {};
export const deleteUser = (req, res) => {};

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await UserModal.findAll();
    const duplicateName = user.find((user) => user.name === name);

    if (duplicateName) {
      responseBody(409, "Conflict", { message: "nama sudah ada!" }, res);
    } else {
      const hashPaswword = await bcrypt.hash(password, 10);
      const result = await UserModal.create({
        name,
        email,
        password: hashPaswword,
      });

      responseBody(
        201,
        "Created",
        { message: "akun berhasil dibuat", data: { id: result.dataValues.id } },
        res
      );
    }
  } catch (e) {
    responseBody(400, "fail", { message: `${e.name} : ${e.message}` }, res);
  }
};

export const loginAuth = async (req, res) => {
  const { email, password } = req.body;

  try {
    const foundUser = await UserModal.findOne({
      where: { email },
    });

    const user = foundUser.dataValues;

    if (!user) {
      responseBody(404, "fail", { message: "user tidak ditemukan" }, res);
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const username = { name: user.name };
      const token = jwt.sign(username, process.env.TOKEN, { expiresIn: "24h" });

      responseBody(
        200,
        "success",
        { message: "berhasil login!", data: { token: token } },
        res
      );
    } else {
      responseBody(404, "fail", { message: "user tidak ditemukan" }, res);
    }
  } catch (e) {
    responseBody(404, "fail", { message: "user tidak ditemukan" }, res);
  }
};
