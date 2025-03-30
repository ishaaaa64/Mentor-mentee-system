import express from "express";
import mongoose from "mongoose";
import Message from "../models/Message.js";
import Request from "../models/Request.js";

const router = express.Router();

// ✅ Get all requests for a teacher
router.get("/teacher/requests", async (req, res) => {
  try {
    const { teacherId } = req.query;
    if (!teacherId) {
      return res.status(400).json({ success: false, message: "Teacher ID is required" });
    }

    console.log(`Fetching requests for teacher: ${teacherId}`);
    const requests = await Request.find({ teacherId }).populate("studentId", "name email");

    res.status(200).json({ success: true, requests });
  } catch (err) {
    console.error("Error fetching teacher requests:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// ✅ Teacher responds to a request (Accept/Reject/Query)
router.post("/teacher/respondRequest", async (req, res) => {
  try {
    const { requestId, status } = req.body;
    if (!requestId || !status) {
      return res.status(400).json({ success: false, message: "Request ID and status are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      return res.status(400).json({ success: false, message: "Invalid request ID" });
    }

    console.log(`Updating request ${requestId} with status: ${status}`);
    const updatedRequest = await Request.findByIdAndUpdate(requestId, { status }, { new: true });

    if (!updatedRequest) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    res.status(200).json({ success: true, updatedRequest });
  } catch (err) {
    console.error("Error updating request status:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// ✅ Fetch messages for a request
router.get("/messages/:requestId", async (req, res) => {
  try {
    const { requestId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      return res.status(400).json({ success: false, message: "Invalid request ID" });
    }

    console.log(`Fetching messages for request ID: ${requestId}`);
    const messages = await Message.find({ requestId }).sort({ createdAt: 1 });

    res.status(200).json({ success: true, messages });
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// ✅ Send a message for a request
router.post("/messages/send", async (req, res) => {
  try {
    const { requestId, sender, message } = req.body;

    if (!requestId || !sender || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      return res.status(400).json({ success: false, message: "Invalid request ID" });
    }

    console.log(`Saving new message for request ${requestId}: ${message}`);
    const newMessage = new Message({ requestId, sender, message });
    await newMessage.save();

    res.status(201).json({ success: true, newMessage });
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export default router;
