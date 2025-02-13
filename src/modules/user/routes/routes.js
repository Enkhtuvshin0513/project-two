import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Users } from "../../../db/models/Users.js";

export const userRoutes = express.Router();

userRoutes.post("/register", async (req, res) => {
  try {
    const { password, email } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const doc = {
      email,
      password: hashedPassword
    };

    const user = await Users.create(doc);
    res.send(user);
  } catch (e) {
    res.send(e.message);
  }
});

userRoutes.post("/login", async (req, res) => {
  const { password, email } = req.body;

  const user = await Users.findOne({ email });

  const valid = await bcrypt.compare(password, user.password);

  if (valid) {
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    res.send(token);
  } else {
    res.send("password buruu");
  }
});
