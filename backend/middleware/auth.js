const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
   try {
       const authHeader = req.headers.authorization;
       if (!authHeader) {
           throw { status: 401, message: "No token provided." };
       }

       const token = authHeader.split(' ')[1];
       if (!token) {
           throw { status: 401, message: "Bearer token not provided." };
       }

       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');

       const userId = decodedToken.userId;
       req.auth = { userId: userId };
       next();
   } catch(error) {
       console.error("JWT Error:", error.message);
       res.status(error.status || 401).json({ error: error.message || "Unauthorized" });
   }
};
