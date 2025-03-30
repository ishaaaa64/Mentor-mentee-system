// import { Teacher } from "../models/teacherSchema.js";

// // 📥 Fetch all teachers
// export const getAllTeachers = async (req, res) => {
//     try {
//         const teachers = await Teacher.find();
//         res.status(200).json({ success: true, teachers });
//     } catch (error) {
//         console.error("Error fetching teachers:", error);
//         res.status(500).json({ success: false, message: "Failed to fetch teachers", error });
//     }
// };

// // ➕ Create a single teacher manually (if needed)
// export const createTeacher = async (req, res) => {
//     try {
//         const { name, email, phno, subject, password } = req.body;

//         if (!name || !email || !phno || !subject || !password) {
//             return res.status(400).json({ success: false, message: "All fields are required" });
//         }

//         // Check if teacher already exists
//         const existingTeacher = await Teacher.findOne({ email });

//         if (existingTeacher) {
//             return res.status(400).json({ success: false, message: "Teacher already exists" });
//         }

//         const newTeacher = new Teacher({ name, email, phno, subject, password });
//         await newTeacher.save();

//         res.status(201).json({ success: true, message: "Teacher added successfully" });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Error adding teacher", error });
//     }
// };





import { Teacher } from "../models/teacherSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const createTeacher = async (req, res, next) => {
    console.log(req.body);
    const { name, email, subject } = req.body;
    try {
        if (!name || !email || !subject) {
            handleValidationError("Please Fill Full Form!", 400);
        }
        await Teacher.create({ name, email, subject });
        res.status(200).json({
            success: true,
            message: "Teacher Created!",
        });
    } catch (err) {
        next(err)
    }
};


export const getAllTeachers = async (req, res, next) => {
    try {
        const teachers = await Teacher.find();
        res.status(200).json({
            success: true,
            teachers,
        });
        if (!name || !email || !phno || !subject || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Check if teacher already exists
        const existingTeacher = await Teacher.findOne({ email });

        if (existingTeacher) {
            return res.status(400).json({ success: false, message: "Teacher already exists" });
        }

        const newTeacher = new Teacher({ name, email, phno, subject, password });
        await newTeacher.save();

        res.status(201).json({ success: true, message: "Teacher added successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error adding teacher", error });
    }
};

export const getTeacherProfile = async (req, res, next) => {
    try {
      const { email } = req.query; // Get email from query parameters
  
      if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
      }
  
      const teacher = await Teacher.findOne({ email }).select("-password"); // Exclude password
  
      if (!teacher) {
        return res.status(404).json({ success: false, message: "Teacher not found" });
      }
  
      res.status(200).json({ success: true, teacher });
    } catch (error) {
      next(error);
    }
  };

  export const getTeacherCount = async (req, res, next) => {
    try {
      const count = await Teacher.countDocuments(); 
      res.status(200).json({ success: true, count });
    } catch (err) {
      next(err);
    }
  };
  