import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import User, { UserDocument } from "../models/userModel"; // Import UserDocument type

interface MyJwtPayload extends JwtPayload {
  userId: string;
}

const protect = expressAsyncHandler(
  async (req: any, res: any, next: NextFunction) => {
    let token;

    if (req.cookies.jwt) {
      token = req.cookies.jwt;
      try {
        const decoded = jwt.verify(
          token,
          "expectasktiwpore23" as Secret
        ) as MyJwtPayload;
        req.user = await User.findById(decoded.userId).select("-password");
        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized, invalid token");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);

export { protect };
