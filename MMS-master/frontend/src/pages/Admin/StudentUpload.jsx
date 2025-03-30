import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "/src/styles/StudentUpload.css";

const StudentUpload = () => {
  const [file, setFile] = useState(null);
  const [students, setStudents] = useState([]);

  // 🟢 Handle File Change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // 🟢 Upload CSV File
  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:4000/api/v1/students/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Upload Response:", res.data);
      toast.success(res.data.message);
      fetchStudents(); // Refresh student list
    } catch (error) {
      console.error("Upload Error:", error);
      toast.error(error.response?.data?.message || "File upload failed");
    }
  };

  // 🟢 Fetch All Students
  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/students/getall");
      setStudents(res.data.students);
    } catch (error) {
      toast.error("Failed to fetch students");
    }
  };

  // 🟢 Call Student
  const handleCallStudent = (student) => {
    toast.info(`Calling ${student.name} (Roll No: ${student.rollNo})`);
  };

  // Fetch students on load
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="container">
      <h2>📂 Upload Student CSV</h2>
      
      <form onSubmit={(e) => { e.preventDefault(); handleUpload(); }}>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button type="submit">Upload</button>
     </form>

      <h3>📋 Student List</h3>
      {students.length === 0 ? <p>No students uploaded yet.</p> : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll No</th>
              <th>Email</th>
              <th>Branch</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.rollNo}>
                <td>{student.name}</td>
                <td>{student.rollNo}</td>
                <td>{student.email}</td>
                <td>{student.branch}</td>
                <td>{student.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentUpload;
