import mongoose from "mongoose";
import validator from "validator";

const studentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  rollNo: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  cardID: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[0-9]{10}$/.test(v); // Ensures exactly 10 digits
      },
      message: "Phone number must be exactly 10 digits",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});


export const Student = mongoose.model('Student', studentSchema);
