// assignmentController.js

import { Assignment } from "../models/assignmentSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const createAssignment = async (req, res, next) => {
  console.log(req.body);
  const { title, description, cardID, deadline } = req.body;
  try {
    if (!title || !description || !cardID || !deadline) {
      return res.status(400).json({ success: false, message: "Please fill the forms" });
    }
    await Assignment.create({ title, description, cardID, deadline });
    res.status(201).json({
      success: true,
      message: "Assignment Created!",
    });
  } catch (err) {
    next(err);
  } 
};

export const getAllAssignments = async (req, res, next) => {
  try {
    const assignments = await Assignment.find();
    res.status(200).json({
      success: true,
      assignments,
    });
  } catch (err) {
    next(err);
  }
}; 
