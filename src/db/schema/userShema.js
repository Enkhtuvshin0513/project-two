import mongoose from "mongoose";

const schema = mongoose.Schema;

export const userShema = new schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address"
      ],
      required: true,
      unique: true
    },
    password: {
      type: String,
      minlength: 6,
      trim: true,
      required: true
    }
  },
  { collection: "users" }
);
