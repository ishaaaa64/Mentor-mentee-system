import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true, // Optimizes lookup performance
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
      index: true,
    },
    projectDetails: {
      type: String,
      required: true,
    },
    groupId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "query"],
      default: "pending",
    },
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message", // Links to messages related to this request
      },
    ],
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", requestSchema);

export default Request;
