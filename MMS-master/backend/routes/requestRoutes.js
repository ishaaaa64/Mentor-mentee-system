import express from "express";
import { sendRequest, getStudentRequest, getTeacherRequests, updateRequestStatus, sendMessage, getMessages } from "../controllers/requestController.js";
console.log("first")
const router = express.Router();

// ✅ Student sends a mentorship request
router.post("/send", sendRequest);

// ✅ Student fetches their existing request
router.get("/student", getStudentRequest);

// ✅ Teacher fetches all incoming requests
router.get("/teacher/:teacherId", getTeacherRequests);

// ✅ Teacher updates request status (Accept/Reject/Query)
router.post("/respond", updateRequestStatus);

// ✅ Messaging routes
router.post("/messages/send", sendMessage);
router.get("/messages/:requestId", getMessages);

export default router;
