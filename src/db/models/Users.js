import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { userShema } from "../schema/userShema.js";

class User {
  getToken() {
    const token = jwt.sign({ userId: this._id }, process.env.SECRET_KEY);

    return token;
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
