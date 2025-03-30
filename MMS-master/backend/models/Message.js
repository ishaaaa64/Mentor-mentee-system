import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    requestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
      required: true,
      index: true, // Optimized lookup performance
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "senderType", // Dynamic reference (either Student or Teacher)
      required: true,
    },
    senderType: {
      type: String,
      enum: ["Student", "Teacher"], // Restricts senderType values
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
