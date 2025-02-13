import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { userShema } from "../schema/userShema.js";

class User {
  getToken() {
    const token = jwt.sign({ userId: this._id }, process.env.SECRET_KEY);

    return token;
  }

  static async register({ email, password }) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const doc = {
      email,
      password: hashedPassword
    };

    const user = await this.create(doc);

    return user;
  }

  static async login({ email, password }) {
    const user = await this.findOne({ email });

    if (!user) {
      throw new Error("Email eswel password buruu bn");
    }

    const valid = bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error("Email eswel password buruu bn");
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

    return token;
  }
}

userShema.loadClass(User);

export const Users = mongoose.model("Users", userShema);
