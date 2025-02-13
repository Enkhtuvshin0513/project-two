import express from "express";
import jwt from "jsonwebtoken";
import { Users } from "../../../db/models/Users.js";

export const userRoutes = express.Router();

userRoutes.post("/register", async (req, res) => {
  try {
    const user = await Users.create(req.body);
    res.send(user);
  } catch (e) {
    res.send(e.message);
  }
});

userRoutes.post("/login", async (req, res) => {
  const { password, email } = req.body;

  const user = await Users.findOne({ email });

  user.password = password;

  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

  res.send(token);
});
