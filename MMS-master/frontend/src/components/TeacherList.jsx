import React, { useEffect } from "react";

const TeacherList = ({ teachers, updateTeacher }) => {
  const handleEdit = (index, field, value) => {
    const updatedTeachers = [...teachers];
    updatedTeachers[index] = { ...updatedTeachers[index], [field]: value };
    updateTeacher(updatedTeachers);
  };

  // Save updated teachers to localStorage whenever teachers update
  useEffect(() => {
    localStorage.setItem("teachers", JSON.stringify(teachers));
  }, [teachers]);

  return (
    <div className="teacher-list">
      {teachers.map((teacher, index) => (
        <div key={index} className="teacher-card">
          <input
            type="text"
            value={teacher.name}
            onChange={(e) => handleEdit(index, "name", e.target.value)}
            placeholder="Enter Name"
          />
          <input
            type="text"
            value={teacher.department}
            onChange={(e) => handleEdit(index, "department", e.target.value)}
            placeholder="Enter Department"
          />
          <input
            type="text"
            value={teacher.specialization}
            onChange={(e) => handleEdit(index, "specialization", e.target.value)}
            placeholder="Enter Specialization"
          />
          <input
            type="email"
            value={teacher.email}
            onChange={(e) => handleEdit(index, "email", e.target.value)}
            placeholder="Enter Email"
          />
        </div>
      ))}
    </div>
  );
};

export default TeacherList;
