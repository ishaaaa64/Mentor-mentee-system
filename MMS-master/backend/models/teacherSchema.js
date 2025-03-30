import mongoose from "mongoose";
import validator from "validator";

const teacherSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  phno: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => /^[1-9]\d{9}$/.test(v), // Must be exactly 10 digits and start with 1-9
      message: "Phone number must be 10 digits and cannot start with 0",
    },
  },
  subject: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});


export const Teacher = mongoose.model("Teacher", teacherSchema);

