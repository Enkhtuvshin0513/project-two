import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { userRoutes } from "./modules/user/routes/routes.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("connected to MONGO");
});

const app = express();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    res.send("Token!!");
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = jwt.verify(token, process.env.SECRET_KEY);

    req.user = user;

    next();
  } catch (e) {
    res.send("Auth token invalid");
  }
};

app.use("/user", userRoutes);

app.use("/data", authMiddleware);

app.get("/data/get-data", (req, res) => {
  const { user } = req;
  console.log(user);

  const data = [{ name: "1" }];
  res.send(data);
});

app.get("/login", (req, res) => {
  const token = jwt.sign({ userId: "123" }, process.env.SECRET_KEY);
  res.send(token);
});

app.listen(3000, () => {
  console.log("app running on 3000");
});
