import express from 'express';
import { Teacher } from '../models/teacherSchema.js';

const router = express.Router();

router.get('/teachers', async (req, res) => {
  try {
    const teachers = await Teacher.find({}, 'name subject'); // Fetch only name & subject
    res.json(teachers);
  } catch (error) {
    console.error("Error fetching teachers:", error);
    res.status(500).json({ message: "Failed to fetch teachers" });
  }
});

export default router;
