import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/TeacherUpload.css"

const TeacherUpload = () => {
  const [file, setFile] = useState(null);
  const [teachers, setTeachers] = useState([]);

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

    console.log("Uploading file:", file);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:4000/api/v1/teachers/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Response:", res.data);

      toast.success(res.data.message);
      fetchTeachers(); // Refresh teacher list
    } catch (error) {
      console.error("Upload Error:", error);
      toast.error(error.response?.data?.message || "File upload failed");
    }
  };

  // 🟢 Fetch All Teachers
  const fetchTeachers = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/teachers/getall");
      setTeachers(res.data.teachers);
    } catch (error) {
      toast.error("Failed to fetch teachers");
    }
  };

  // Fetch teachers on load
  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <div className="container">
      <h2>📂 Upload Teacher CSV</h2>
      
      <form onSubmit={(e) => { e.preventDefault(); handleUpload(); }}>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button type="submit">Upload</button>
     </form>

      <h3>📋 Teacher List</h3>
      {teachers.length === 0 ? <p>No teachers uploaded yet.</p> : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Subject</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.email}>
                <td>{teacher.name}</td>
                <td>{teacher.email}</td>
                <td>{teacher.phno}</td>
                <td>{teacher.subject}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TeacherUpload;
