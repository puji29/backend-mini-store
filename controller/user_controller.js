const { registerUser } = require("../usecase/user_usecase");
const { createToken } = require("../utils/jwt_util");

const createHandler = async (req, res) => {
  try {
    const newDataUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };

    const user = await registerUser(newDataUser);
    const token = await createToken(newDataUser)
    res.status(201).json({
      message: "create user succesfully",
      data: user,
      token: token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createHandler,
};
