import jwt, { Secret } from "jsonwebtoken";

const generateToken = (res: any, userId: any) => {
  const jwtSecret = "expectasktiwpore23";
  if (!jwtSecret) {
    throw new Error("JWT secret is not defined");
  }

  const token = jwt.sign({ userId }, jwtSecret as Secret, {
    expiresIn: "30d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
