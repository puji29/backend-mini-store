const { authenticateUser } = require("../usecase/auth_usecase.js");

async function loginHandler(req, res) {
  try {
    const { username, password } = req.body;
    const authResult = await authenticateUser(username, password);
    
    // Return user data and token
    res.json({ success: true, user: authResult.user, token: authResult.token });
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
