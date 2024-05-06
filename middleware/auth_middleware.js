const jwtUtil = require("../utils/jwt_util");

const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");

    // Periksa apakah token ada dan formatnya benar
    if (!token || !token.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided or invalid token format" });
    }

    // Coba decode token
    const decoded = jwtUtil.verifyToken(token.split(" ")[1]);
    if (decoded) {
        // Jika berhasil, tambahkan user_id ke request dan lanjutkan ke middleware berikutnya
        req.user_id = decoded.user_id;
        next();
    } else {
        // Jika token tidak valid atau telah kedaluwarsa, kirim pesan error
        res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
};

module.exports = {
    authMiddleware
};