import React, { useState } from "react";

const TeacherForm = ({ addTeacher, teachers = [] }) => {  // Ensure teachers is always an array
  const [teacher, setTeacher] = useState({
    name: "",
    department: "",
    specialization: "",
    email: "",
  });

  const handleChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!teacher.name || !teacher.department || !teacher.specialization || !teacher.email) {
      alert("All fields are required!");
      return;
    }

    // Check if the email already exists in the teacher list
    const isDuplicate = teachers.some((t) => t.email === teacher.email);
    if (isDuplicate) {
      alert("A teacher with this email already exists!");
      return;
    }

    addTeacher?.(teacher);  // Ensure addTeacher is defined before calling
    setTeacher({ name: "", department: "", specialization: "", email: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="teacher-form">
      <input type="text" name="name" value={teacher.name} onChange={handleChange} placeholder="Enter Name" required />
      <input type="text" name="department" value={teacher.department} onChange={handleChange} placeholder="Enter Department" required />
      <input type="text" name="specialization" value={teacher.specialization} onChange={handleChange} placeholder="Enter Specialization" required />
      <input type="email" name="email" value={teacher.email} onChange={handleChange} placeholder="Enter Email" required />
      <button type="submit">Add Teacher</button>
    </form>
  );
};

export default TeacherForm;
