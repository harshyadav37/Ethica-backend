// const jwt = require("jsonwebtoken");

// const SecretKey = process.env.JWT_SECRET || "mysecretkey";

// const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers["authorization"];

//   // ✅ Check if token exists
//   if (!authHeader) {
//     return res.status(401).json({
//       message: "Unauthorized - JWT token is required",
//     });
//   }

//   try {
//     // ✅ Extract token from "Bearer TOKEN"
//     const token = authHeader.startsWith("Bearer ")
//       ? authHeader.split(" ")[1]
//       : authHeader;

//     // ✅ Verify token
//     const decoded = jwt.verify(token, SecretKey);

//     // ✅ Attach user data to request
//     req.user = decoded;

//     next();
//   } catch (error) {
//     return res.status(401).json({
//       message: "Unauthorized - Invalid or expired token",
//     });
//   }
// };

// module.exports = authMiddleware;


const jwt = require("jsonwebtoken");

const SecretKey = process.env.JWT_SECRET || "mysecretkey";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Unauthorized - No token provided",
      });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    const decoded = jwt.verify(token, SecretKey);

    // ✅ IMPORTANT
    req.user = {
      id: decoded.id,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized - Invalid token",
      error: error.message,
    });
  }
};

module.exports = authMiddleware;