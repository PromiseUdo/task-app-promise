import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel";
import generateToken from "../utils/generateToken";
// @desc Auth user/set token
// route POST /api/users/auth
// @access  Public
const authUser = expressAsyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});
const registerUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    console.log(username, email, password);

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
);
const logoutUser = expressAsyncHandler(async (req: Request, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    message: "Logged out",
  });
});

const getUser = expressAsyncHandler(async (req: any, res: any) => {
  const user = {
    _id: req.user.id,
    username: req.user.username,
    email: req.user.email,
  };

  res.status(200).json(user);
});

export { authUser, registerUser, logoutUser, getUser };
