const bcrypt = require ('bcrypt');
const jwt =require( "jsonwebtoken");
const {UserModal} =require("./modal.js");
const {responseBody} =require( "../../helpers/responseBody");

const getUser = async (req, res) => {
  try {
    const users = await UserModal.findAll({
      attributes: ["id", "name", "email"],
    });
    res.status(200).json({
      data: users,
      metadata: "test user endpoint",
    });
  } catch (e) {
    responseBody(400, "fail", { message: "invalid" }, res);
  }
};

const updateUser = async (req, res) => {
  const username = req.user.name;
  const { email, password } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await UserModal.update(
      { email, password: hashPassword },
      { where: { name: username } }
    );

    if (user[0] === 0) {
      throw Error();
    }

    responseBody(200, "succes", { message: "Update successfully" }, res);
  } catch (e) {
    responseBody(404, "fail", { message: "not found" }, res);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const saran = await UserModal.findOne({
      where: {
        id: id,
      },
    });
    const user = await UserModal.destroy({ where: { id } });
    if (user === 0) {
      throw Error();
    }

    responseBody(200, "success", { message: "Delete successfully" }, res);
  } catch (e) {
    responseBody(404, "fail", { message: "not found" }, res);
  }
};

const register = async (req, res) => {
  const { name, email, password, confpassword } = req.body;
  try {
    if (password !== confpassword)
      return res
        .status(400)
        .json({ msg: "password & confpassword tidak cocok" });
    const user = await UserModal.findAll();
    const duplicateName = user.find((user) => user.name === name);

    if (duplicateName) {
      responseBody(
        400,
        "fail",
        { message: "Nama duplikat atau sudah ada" },
        res
      );
    } else {
      const hashPaswword = await bcrypt.hash(password, 10);

      await UserModal.create({
        name,
        email,
        password: hashPaswword,
      });
      responseBody(200, "success", { message: "successfully" }, res);
    }
  } catch (e) {
    responseBody(400, "fail", { message: `${e.name}: ${e.message}` }, res);
  }
};

const generateAccesToken = (name) => {
  return jwt.sign(name, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "24h" });
};


const tokenHandler = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token tidak ada." });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token tidak valid." });
    }
    const username = { name: user.name };
    const accessToken = generateAccesToken(username);
    res.json({ accessToken });
  });
};

 const loginAuth = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ msg: "Please provide email and password" });

    const foundUser = await UserModal.findOne({
      where: { email },
    });
    if (!foundUser) return res.status(400).json({ msg: "email is wrong" });

    const user = foundUser.dataValues;

    if (!user) {
      return responseBody(401, "fail", { message: "User Unauthorized" }, res);
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(400).json({ msg: "wrong password" });
    const username = { name: user.name };
    const accessToken = generateAccesToken(username);
    const refreshToken = jwt.sign(username, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "3d",
    });

    await UserModal.update({ refreshToken }, { where: { name: user.name } });

    res.cookie("jwt", refreshToken, { httpOnly: true, sameSite: "None" });
    responseBody(
      200,
      "success",
      { data: { username: username.name, accessToken, refreshToken } },
      res
    );
  } catch (e) {
    console.log(e)
    responseBody(404, "fail", { message: "user tidak ditemukan" }, res);
  }
};
const logoutHandler = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) res.sendStatus(204);

  const refreshToken = cookies.jwt;
  const foundUser = await UserModal.findOne({ where: { refreshToken } });
  const user = foundUser.dataValues;

  if (!user) {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.sendStatus(204);
  }

  try {
    await UserModal.update({ refreshToken: "" }, { where: { refreshToken } });
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None" });
    res.sendStatus(204);
  } catch (e) {
    responseBody(404, "fail", { message: "User tidak ditemukan!" }, res);
  }
};
module.exports={
  getUser,
  tokenHandler,
  logoutHandler,
  deleteUser,
  loginAuth,
  updateUser,
  register,
}
