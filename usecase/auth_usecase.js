const bcrypt = require("bcrypt");
const { createToken } = require("../utils/jwt_util");
const createDbConnection = require("../config/Database");

function authenticateUser(username, providedPassword) {
  return new Promise((resolve, reject) => {
    const db = createDbConnection()
    
    const query = "SELECT user_id, password FROM User WHERE username = ?";
    db.query(query, [username], (error, results) => {
      if (error) {
        return reject(error);
      }
      if (results.length > 0) {
        const user = results[0];
        bcrypt.compare(providedPassword, user.password, (err, isMatch) => {
          if (err) {
            return reject(err);
          }
          if (isMatch) {
            const token = createToken(user.user_id);
            return resolve(token);
          } else {
            return reject({ message: 'Authentication failed' });
          }
        });
      } else {
        return reject("User not found");
      }
    });
  });
}



module.exports = { authenticateUser };
