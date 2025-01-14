import jwt from "jsonwebtoken";

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email,firstName: user.firstName, lastName: user.lastName }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export { generateToken, verifyToken };
