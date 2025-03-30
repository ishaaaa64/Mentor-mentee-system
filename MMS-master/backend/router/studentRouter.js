import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Papa from "papaparse";
import { getAllStudents, createStudent, getStudentCount } from "../controllers/studentController.js";
import { sendStudentEmail } from "../services/emailservice.js";
import { Student } from "../models/studentSchema.js";
import { studentSignIn } from "../controllers/usersController.js";

const router = express.Router();

// (Only Accept CSV)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
//file upload
const store = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = "uploads/students";
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
//file upload
const fileFilter = (req, file, cb) => {
    const allowedTypes = [".pdf", ".ppt", ".pptx"];
    const ext = path.extname(file.originalname).toLowerCase();

    if (!allowedTypes.includes(ext)) {
        return cb(new Error("Only PDF and PPT files are allowed"));
    }
    cb(null, true);
};
//file upload
const upfile = multer({ storage: store, fileFilter });
//csv upload
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (path.extname(file.originalname) !== ".csv") {
            return cb(new Error("Only CSV files are allowed"));
        }
        cb(null, true);
    }
});
// file upload
router.post("/upfile", upfile.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    res.status(200).json({ message: "File uploaded successfully", file: req.file.filename });
});

// Upload CSV & Add Students to DB
router.post("/upload", upload.single("file"), async (req, res) => {
    console.log("Received file:", req.file);

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
                const studentsToInsert = [];
                const errors = [];

                for (const row of results.data) {
                    const { name, rollNo, cardID, email, branch, phoneNumber, password } = row;

                    if (!name || !rollNo || !cardID || !email || !branch || !phoneNumber || !password) {
                        errors.push(`Missing data for rollNo: ${rollNo}`);
                        continue;
                    }

                    const existingStudent = await Student.findOne({
                        $or: [{ rollNo }, { email }, { cardID }, { phoneNumber }]
                    });

                    if (existingStudent) {
                        errors.push(`Duplicate: ${rollNo} / ${email} / ${cardID}`);
                        continue;
                    }

                    studentsToInsert.push({ name, rollNo, cardID, email, branch, phoneNumber, password });
                }

                if (studentsToInsert.length > 0) {
                    await Student.insertMany(studentsToInsert);
                }
                const students = results.data.map(student => ({
                    name: student.name,
                    rollNo: Number(student.rollNo), // Ensure it's a number
                    cardID: student.cardID,
                    email: student.email,
                    branch: student.branch,
                    phoneNumber: Number(student.phoneNumber), // Ensure it's a number
                    password: student.password
                }));

                console.log("Saving students:", students);

                //await Student.insertMany(results.data);
                //fs.unlinkSync(filePath); // Remove file after processing
                res.status(200).json({ message: "Students uploaded successfully", errors: errors.length ? errors : "No errors" });
            } catch (error) {
                res.status(500).json({ message: "Error saving students", error });
            }
        }
    });
});

// Fetch All Students
router.get('/getall', getAllStudents);

router.post("/s-login", studentSignIn);
router.get('/count', getStudentCount);

// Student Login - Email Sending Functionality
router.post("/student-login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(401).json({ status: 401, message: "Email and Password are required" });
    }

    try {
        await sendStudentEmail(email);  // Sending email
        res.status(201).json({ status: 201, message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ status: 500, message: "Failed to send email" });
    }
});

export default router;
