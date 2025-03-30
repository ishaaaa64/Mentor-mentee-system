// //import { handleValidationError } from "../middlewares/errorHandler.js";
// import { Admin } from "../models/adminRegisterSchema.js";
// import { Student } from "../models/studentSchema.js";
// import { Teacher } from "../models/teacherSchema.js";
// import { sendAdminEmail } from "../services/emailservice.js";  // Import the email service

// // ✅ Admin Sign-In with Email Notification
// export const adminSignIn = async (req, res, next) => {
//   console.log("Received Request Body:", req.body);

//   const { email, password } = req.body;

//   try {
//     if (!email || !password) {
//       console.log("Missing fields:", { email, password });
//       return res.status(400).json({ success: false, message: "Please provide email and password" });
//     }

//     const existingAdmin = await Admin.findOne({ email });

//     if (!existingAdmin) {
//       return res.status(401).json({ success: false, message: "Invalid Email" });
//     }

//     const isPasswordValid = existingAdmin.password === password;

//     if (!isPasswordValid) {
//       return res.status(401).json({ success: false, message: "Invalid Password" });
//     }

//     // ✅ Send Email Notification
//     try {
//       await sendAdminEmail(email);  // Send sign-in notification email
//       console.log(`Email sent to ${email}`);
//     } catch (emailError) {
//       console.error("Failed to send admin sign-in email:", emailError);
//     }

//     // ✅ Return Success Response
//     return res.status(200).json({
//       success: true,
//       message: "Admin signed in successfully",
//       admin: {
//         email: existingAdmin.email,
//         name: existingAdmin.name,
//         phno: existingAdmin.phno,
//       },
//     });

//   } catch (err) {
//     console.error("Sign-in Error:", err);
//     next(err);
//   }
// };

// // ✅ Get Admin Profile
// export const getAdminProfile = async (req, res, next) => {
//   try {
//     console.log("Request Query:", req.query);

//     const { email } = req.query;

//     if (!email) {
//       return res.status(400).json({ success: false, message: "Email is required" });
//     }

//     const admin = await Admin.findOne({ email }).select("-password");

//     if (!admin) {
//       return res.status(404).json({ success: false, message: "Admin not found" });
//     }

//     return res.json({ success: true, admin });
//   } catch (error) {
//     next(error);
//   }
// };

// // ✅ Student Sign-In (No Email)
// export const studentSignIn = async (req, res, next) => {
//   const { email, password } = req.body;
//   try {
//     if (!email || !password) {
//       return res.status(400).json({ success: false, message: "Please provide email and password" });
//     }
//     // Check if student exists in the database
//     const existingStudent = await Student.findOne({ email });

//     if (!existingStudent) {
//       return res.status(401).json({ success: false, message: "Student not found. Please check your email." });
//     }

//     // Check if password matches
//     if (existingStudent.password !== password) {
//       return res.status(401).json({ success: false, message: "Invalid password." });
//     }

//     // Your sign-in logic for student goes here
//     res.status(200).json({
//       success: true,
//       message: "Student signed in successfully",
//       student: {
//         id: existingStudent._id,
//         name: existingStudent.name,
//         rollNo: existingStudent.rollNo,
//         branch: existingStudent.branch,
//         email: existingStudent.email,
//         phoneNumber: existingStudent.phoneNumber,
//         cardID: existingStudent.cardID,
//       },
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// // ✅ Teacher Sign-In (No Email)
// export const teacherSignIn = async (req, res, next) => {
//   const { email, password } = req.body;
//   try {
//     if (!email || !password) {
//       return res.status(400).json({ success: false, message: "Please provide email and password" });
//     }
//     const existingTeacher = await Teacher.findOne({ email });

//     if (!existingTeacher) {
//       return res.status(401).json({ success: false, message: "Invalid email" });
//     }

//     if (existingTeacher.password !== password) {
//       return res.status(401).json({ success: false, message: "Invalid password" });
//     }

//     // Your sign-in logic for teacher goes here
//     res.status(200).json({
//       success: true,
//       message: "Teacher signed in successfully",
//       teacher: {
//         id: existingTeacher._id,
//         name: existingTeacher.name,
//         email: existingTeacher.email,
//         phno: existingTeacher.phno,
//         subject: existingTeacher.subject,
//       },
//     });
//   } catch (err) {
//     next(err);
//   }
// };

import { handleValidationError } from "../middlewares/errorHandler.js";
import { Admin } from "../models/adminRegisterSchema.js";
import { Student } from "../models/studentSchema.js";
import { Teacher } from "../models/teacherSchema.js";
import { sendAdminEmail, sendStudentEmail, sendTeacherEmail } from "../services/emailservice.js";  // Import email services


// Admin Sign-In with Email Notification
export const adminSignIn = async (req, res, next) => {
  console.log("Received Request Body:", req.body);

  const { email, password } = req.body;

  try {
    if (!email || !password) {
      console.log("Missing fields:", { email, password });
      return res.status(400).json({ success: false, message: "Please provide email and password" });
    }

    const existingAdmin = await Admin.findOne({ email });

    if (!existingAdmin) {
      return res.status(401).json({ success: false, message: "Invalid Email" });
    }

    if (existingAdmin.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid Password" });
    }

    // Send Email Notification
    try {
      await sendAdminEmail(email);
      console.log(`Admin Email sent to ${email}`);
    } catch (emailError) {
      console.error("Failed to send admin sign-in email:", emailError);
    }

    return res.status(200).json({
      success: true,
      message: "Admin signed in successfully",
      admin: {
        email: existingAdmin.email,
        name: existingAdmin.name,
        phno: existingAdmin.phno,
      },
    });

  } catch (err) {
    console.error("Sign-in Error:", err);
    next(err);
  }
};

// Get Admin Profile
export const getAdminProfile = async (req, res, next) => {
  try {
    console.log("Request Query:", req.query);

    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const admin = await Admin.findOne({ email }).select("-password");

    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    return res.json({ success: true, admin });
  } catch (error) {
    next(error);
  }
};

// Student Sign-In with Email Notification
export const studentSignIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide email and password" });
    }

    const existingStudent = await Student.findOne({ email });

    if (!existingStudent) {
      return res.status(401).json({ success: false, message: "Student not found. Please check your email." });
    }

    if (existingStudent.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid password." });
    }

    // Send Email Notification
    try {
      await sendStudentEmail(email);
      console.log(`Student Email sent to ${email}`);
    } catch (emailError) {
      console.error("Failed to send student sign-in email:", emailError);
    }

    res.status(200).json({
      success: true,
      message: "Student signed in successfully",
      student: {
        id: existingStudent._id,
        name: existingStudent.name,
        rollNo: existingStudent.rollNo,
        branch: existingStudent.branch,
        email: existingStudent.email,
        phoneNumber: existingStudent.phoneNumber,
        cardID: existingStudent.cardID,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Teacher Sign-In with Email Notification
export const teacherSignIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide email and password" });
    }

    const existingTeacher = await Teacher.findOne({ email });

    if (!existingTeacher) {
      return res.status(401).json({ success: false, message: "Invalid email" });
    }

    if (existingTeacher.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    // Send Email Notification
    try {
      await sendTeacherEmail(email);
      console.log(`Teacher Email sent to ${email}`);
    } catch (emailError) {
      console.error("Failed to send teacher sign-in email:", emailError);
    }

    res.status(200).json({
      success: true,
      message: "Teacher signed in successfully",
      teacher: {
        id: existingTeacher._id,
        name: existingTeacher.name,
        email: existingTeacher.email,
        phno: existingTeacher.phno,
        subject: existingTeacher.subject,
      },
    });
  } catch (err) {
    next(err);
  }
};

