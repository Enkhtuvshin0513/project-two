import mongoose from "mongoose";
import { userShema } from "../schema/userShema.js";

export const Users = mongoose.model("Users", userShema);
