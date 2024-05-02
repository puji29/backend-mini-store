const bcrypt = require("bcrypt");
const { createToken } = require("../utils/jwt_util");
const createDbConnection = require("../config/Database");

async function authenticateUser(username, providedPassword) {
  const db = await createDbConnection();
  
  try {
    const query = "SELECT user_id, username,email, password FROM User WHERE username = ?";
    const [results] = await db.query(query, [username]);
    
    if (results.length > 0) {
      const user = results[0];
      const isMatch = await bcrypt.compare(providedPassword, user.password);
      
      if (isMatch) {
        const token = createToken(user.user_id);
        // Return both user data and token
        return { user: { user_id: user.user_id, username: user.username, email: user.email }, token };
      } else {
        throw new Error('Authentication failed');
      }
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    throw error;
  } finally {
    db.end();
  }
}

module.exports = { authenticateUser };
