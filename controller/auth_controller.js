const { authenticateUser } = require("../usecase/auth_usecase.js");

async function loginHandler(req, res) {
  try {
    const { username, password } = req.body;
    const token = await authenticateUser(username, password);
    
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({
        success: false,
        message: error.message || "Authentication failed",
      });
  }
}

module.exports = {
  loginHandler,
};
