import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res
          .status(401)
          .json({ message: "User not found, not authorized" });
      }

      // Attach the user object to the request so other routes can have access to it
      req.user = {
        id: req.user._id,
        email: req.user.email,
        role: req.user.role,
      };
      console.log(req.user.role);

      next();
    } else {
      return res.status(401).json({ message: "No token, not authorized" });
    }
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.status(401).json({ message: "Invalid token, not authorized" });
  }
};
