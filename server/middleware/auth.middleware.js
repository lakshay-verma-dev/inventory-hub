import { verifyToken } from "../utils/jwt.js";
import { User } from "../models/User.js";

export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).json({ error: "Unauthorized, no token provided" });

  try {
    const decoded = verifyToken(token);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized, invalid token" });
  }
};
