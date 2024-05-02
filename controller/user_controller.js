
const { registerUser } = require("../usecase/user_usecase");
const { createToken } = require("../utils/jwt_util");


const createHandler = async (req, res) => {
  try {
   const newDataUser = req.body

    const user = await registerUser(newDataUser);
    const token = await createToken(user.username,user.password)
    
    res.status(201).json({user: user,token:token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createHandler,
};
