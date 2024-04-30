const jwtUtil = require("../utils/jwt_util")

const authMiddleware = async (req,res,next) => {
    const token = req.header("Authorization")

    try {
        if(!token || !token.startsWith("Bearer ")){
            return res.status(401).json({message: "Unauthorized: Invalid token format"})
        }

        const decode = await jwtUtil.verifyToken(token.split(" ")[1])
        req.user_id = decode.user_id
        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({message: "Unauthorized: Invalid token format"})
    }
}

module.exports = {
    authMiddleware
}