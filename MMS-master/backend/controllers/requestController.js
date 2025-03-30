import Request from "../models/Request.js";
import Message from "../models/Message.js";
import { Student } from "../models/studentSchema.js";
import mongoose from "mongoose";

// ✅ Student sends a mentorship request
export const sendRequest = async (req, res) => {
  console.log(req.body)
  try {
    const { studentId, teacherId, projectDetails, groupId } = req.body;

    if (!studentId || !teacherId || !projectDetails || !groupId) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Check if student already has a request
    const existingRequest = await Request.findOne({ studentId });
    if (existingRequest) {
      return res.status(400).json({ success: false, message: "You have already sent a request." });
    }

    const newRequest = new Request({ studentId, teacherId, projectDetails, groupId });
    await newRequest.save();

    return res.status(201).json({ success: true, request: newRequest });
  } catch (error) {
    console.error("Send Request Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Student fetches their request
export const getStudentRequest = async (req, res) => {
  try {
    const { studentId, teacherId } = req.query;
console.log("sita ram")
    if (!studentId || !teacherId) {
      return res.status(400).json({ success: false, message: "Missing studentId or teacherId" });
    }

    const request = await Request.findOne({ studentId, teacherId });
    return res.status(200).json({ success: true, request });
  } catch (error) {
    console.error("Get Student Request Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Teacher fetches all requests

export const getTeacherRequests = async (req, res) => {
  try {
    const { teacherId } = req.params;
    console.log("Teacher ID:", teacherId);

    // Convert teacherId to ObjectId (if needed)
    const teacherObjectId = new mongoose.Types.ObjectId(teacherId);

    // Fetch requests for the teacher
    const requests = await Request.find({ teacherId: teacherObjectId });

    if (!requests.length) {
      return res.status(404).json({ success: false, message: "No requests found" });
    }

    // Fetch student details (only name and email) for each request
    const updatedRequests = await Promise.all(
      requests.map(async (request) => {
        const studentDetails = await Student.findById(request.studentId).select("name email"); // Fetch only name & email
        console.log("Student Details:", studentDetails);

        return {
          ...request.toObject(), // Convert Mongoose document to plain object
          studentName: studentDetails?.name || "Unknown",
          studentEmail: studentDetails?.email || "Unknown",
        };
      })
    );

    console.log("Updated Requests:", updatedRequests);
    return res.status(200).json({ success: true, requests: updatedRequests });

  } catch (error) {
    console.error("Get Teacher Requests Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Teacher updates request status (Accept/Reject/Query)
export const updateRequestStatus = async (req, res) => {
  try {
    const { requestId, status } = req.body;
    if (!requestId || !status) {
      return res.status(400).json({ success: false, message: "Missing requestId or status" });
    }

    const updatedRequest = await Request.findByIdAndUpdate(requestId, { status }, { new: true });
    return res.status(200).json({ success: true, request: updatedRequest });
  } catch (error) {
    console.error("Update Request Status Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Send Message
export const sendMessage = async (req, res) => {
  try {
    const { requestId, sender, message } = req.body;
    if (!requestId || !sender || !message) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const newMessage = new Message({ requestId, sender, message });
    await newMessage.save();

    return res.status(201).json({ success: true, newMessage });
  } catch (error) {
    console.error("Send Message Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Fetch Messages
export const getMessages = async (req, res) => {
  try {
    const { requestId } = req.params;
    const messages = await Message.find({ requestId });
    return res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error("Get Messages Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
