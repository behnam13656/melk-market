// models/User.js
import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "نام الزامی است"],
    trim: true,
    maxLength: [50, "نام نمی‌تواند بیش از 50 کاراکتر باشد"],
  },
  lastname: {
    type: String,
    required: [true, "نام خانوادگی الزامی است"],
    trim: true,
    maxLength: [50, "نام خانوادگی نمی‌تواند بیش از 50 کاراکتر باشد"],
  },
  email: {
    type: String,
    required: [true, "ایمیل الزامی است"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "فرمت ایمیل صحیح نیست"],
  },
  password: {
    type: String,
    required: [true, "رمز عبور الزامی است"],
    minLength: [6, "رمز عبور باید حداقل 6 کاراکتر باشد"],
  },
  role: {
    type: String,

    default: "USER",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
});

const User = models.User || model("User", userSchema);
export default User