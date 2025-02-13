import express from "express";
import bcrypt from "bcrypt";
import { Users } from "../../../db/models/Users.js";

export const userRoutes = express.Router();

userRoutes.post("/register", async (req, res) => {
  try {
    const { password, email } = req.body;

    const user = await Users.register({ email, password });
    const token = user.getToken();

    res.send(token);
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
