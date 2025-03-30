// import express from "express";
// import multer from "multer";
// import path from "path";
// import fs from "fs";
// import Papa from "papaparse";
// import { Teacher } from "../models/teacherSchema.js";
// import { getAllTeachers, createTeacher } from "../controllers/teacherController.js";

// const router = express.Router();

// const uploadFolder = "uploads/";
// if (!fs.existsSync(uploadFolder)) {
//     fs.mkdirSync(uploadFolder, { recursive: true });
// }
// // Multer Configuration (Only Accept CSV)
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, uploadFolder);

//     },
//     filename: (req, file, cb) => {
//         const filePath = path.join(uploadFolder, file.originalname);
//         if (fs.existsSync(filePath)) {
//             fs.unlinkSync(filePath); // Delete existing file
//         }
//         cb(null, file.originalname);
//     }
// });

// const upload = multer({
//     storage,
//     fileFilter: (req, file, cb) => {
//         if (path.extname(file.originalname) !== ".csv") {
//             return cb(new Error("Only CSV files are allowed"));
//         }
//         cb(null, true);
//     }
// });

// // 🚀 Upload CSV & Add Teachers to DB
// router.post("/upload", upload.single("file"), async (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ message: "No file uploaded" });
// }
//     const filePath = req.file.path;
//     const fileContent = fs.readFileSync(filePath, "utf8");

//     Papa.parse(fileContent, {
//         header: true,
//         skipEmptyLines: true,
//         complete: async (results) => {
//             console.log("Parsed CSV Data:", results.data);

//             if (results.data.length === 0) {
//                 return res.status(400).json({ message: "CSV file is empty or invalid" });
//             }

//             try {
//                 const teachersToInsert = [];
//                 const errors = [];

//                 for (const row of results.data) {
//                     const {email, name, phno, subject, password } = row;

//                     if (!email || !name || !phno || !subject || !password) {
//                         errors.push(`Missing data: ${JSON.stringify(row)}`);
//                         continue;
//                     }

//                     const existingTeacher = await Teacher.findOne({ email });
//                     if (existingTeacher) {
//                         errors.push(`Duplicate teacher: ${email}`);
//                         continue;
//                     }

//                     teachersToInsert.push({ email, name, phno, subject, password });
//                 }

//                 if (teachersToInsert.length > 0) {
//                     await Teacher.insertMany(teachersToInsert);
//                     console.log("Inserted Teachers:", teachersToInsert);
//                 }

//                 //fs.unlinkSync(filePath); // Remove file after processing
//                 res.status(200).json({ message: "Teachers uploaded successfully", uploadedTeachers: teachersToInsert, errors });
//             } catch (error) {
//                 res.status(500).json({ message: "Error saving teachers", error });
//             }
//         }
//     });
// });

// // 🏫 Fetch All Teachers
// router.get("/getall", async (req, res) => {
//     try {
//         const teachers = await Teacher.find();
//         res.status(200).json({ teachers });
//     } catch (error) {
//         res.status(500).json({ message: "Failed to fetch teachers", error });
//     }
// });

// export default router;



import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Papa from "papaparse";
import { Teacher } from "../models/teacherSchema.js";
import { getAllTeachers, createTeacher, getTeacherProfile, getTeacherCount  } from "../controllers/teacherController.js";
import { teacherSignIn } from "../controllers/usersController.js";
import { sendTeacherEmail } from "../services/emailservice.js";

const router = express.Router();

// 📂 Ensure Upload Folder Exists
const uploadFolder = "uploads/";
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder, { recursive: true });
}

// 📥 Multer Configuration (Only Accept CSV)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
        const filePath = path.join(uploadFolder, file.originalname);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); // Delete existing file
        }
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (path.extname(file.originalname) !== ".csv") {
            return cb(new Error("Only CSV files are allowed"));
        }
        cb(null, true);
    }
});

// 🚀 Upload CSV & Add Teachers to DB
router.post("/upload", upload.single("file"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;
    const fileContent = fs.readFileSync(filePath, "utf8");

    Papa.parse(fileContent, {
        header: true,
        skipEmptyLines: true,
        complete: async (results) => {
            console.log("Parsed CSV Data:", results.data);

            if (results.data.length === 0) {
                return res.status(400).json({ message: "CSV file is empty or invalid" });
            }

            try {
                const teachersToInsert = [];
                const errors = [];

                for (const row of results.data) {
                    const { email, name, phno, subject, password } = row;

                    if (!email || !name || !phno || !subject || !password) {
                        errors.push(`Missing data: ${JSON.stringify(row)}`);
                        continue;
                    }

                    const existingTeacher = await Teacher.findOne({ email });
                    if (existingTeacher) {
                        errors.push(`Duplicate teacher: ${email}`);
                        continue;
                    }

                    teachersToInsert.push({ email, name, phno, subject, password });
                }

                if (teachersToInsert.length > 0) {
                    await Teacher.insertMany(teachersToInsert);
                    console.log("Inserted Teachers:", teachersToInsert);
                }

                fs.unlinkSync(filePath); // Remove CSV file after processing
                res.status(200).json({
                    message: "Teachers uploaded successfully",
                    uploadedTeachers: teachersToInsert,
                    errors
                });
            } catch (error) {
                res.status(500).json({ message: "Error saving teachers", error });
            }
        }
    });
});

// 🏫 Fetch All Teachers
router.get("/getall", async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.status(200).json({ teachers });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch teachers", error });
    }
});

// Teacher Login
router.post('/t-login', teacherSignIn);
router.get('/count', getTeacherCount);

// Fetch Profile
router.get("/profile", getTeacherProfile);

// 📩 Teacher Login - Email Sending Functionality
router.post("/t-login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(401).json({ status: 401, message: "Email and Password are required" });
    }

    try {
        await sendTeacherEmail(email);  // Sending email
        res.status(201).json({ status: 201, message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ status: 500, message: "Failed to send email" });
    }
});

export default router;
