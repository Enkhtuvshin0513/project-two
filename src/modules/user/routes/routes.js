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

    res.send(user.getToken());
  } catch (e) {
    res.send(e.message);
  }
});

userRoutes.post("/login", async (req, res) => {
  const { password, email } = req.body;

  try {
    const token = await Users.login({ email, password });

    res.send(token);
  } catch (e) {
    res.send(e.message);
  }
});

userRoutes.get("/get-token", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Users.findOne({ email });

    res.send(user.getToken());
  } catch (e) {
    res.send(e.message);
  }
});
