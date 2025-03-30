// Students.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import {
  StudentsContainer,
  Content,
  StudentsContent,
  StudentsHeader,
  StudentList,
  StudentItem,
  AddStudentForm,
  AddStudentInput,
  AddStudentButton,
} from '../../styles/StudentsStyles'; 

const Students = () => {
  const [newStudent, setNewStudent] = useState({ email: '', name: '', rollNo: '', cardID: '', branch: '', phoneNumber: '', password: '' });
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/students/getall');
      setStudents(response.data.students);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (newStudent.name.trim() !== '' && newStudent.rollNo.trim() !== '' && newStudent.cardID.trim() !== '' && newStudent.email.trim() !== '' && newStudent.branch.trim() !== '' && newStudent.phoneNumber.trim() !== '' && newStudent.password.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:4000/api/v1/students', newStudent);
        setStudents([...students, response.data.student]);
        setNewStudent({ name: '', rollNo: '', cardID: '', email: '', branch: '', phoneNumber: '', password: '' });
      } catch (error) {
        console.error('Error adding student:', error);
      }
    }
  };

  return (
    <StudentsContainer>
      <Sidebar />
      <Content>
        <StudentsContent>
          <StudentsHeader>Students</StudentsHeader>
          <AddStudentForm onSubmit={handleAddStudent}>
            <AddStudentInput
              type="text"
              placeholder="Enter student name"
              value={newStudent.name}
              onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            /><br /><br />
            <AddStudentInput
              type="text"
              placeholder="Enter roll number"
              value={newStudent.rollNo}
              onChange={(e) => setNewStudent({ ...newStudent, rollNo: e.target.value })}
            /><br /><br />
            <AddStudentInput
              type="text"
              placeholder="Enter cardID"
              value={newStudent.cardID}
              onChange={(e) => setNewStudent({ ...newStudent, cardID: e.target.value })}
            /><br /><br />
            <AddStudentInput
              type="email"
              placeholder="Enter email address"
              value={newStudent.email}
              onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
            /><br /><br />
            <AddStudentInput
              type="text"
              placeholder="Enter branch"
              value={newStudent.branch}
              onChange={(e) => setNewStudent({ ...newStudent, branch: e.target.value })}
            /><br /><br />
            <AddStudentInput
              type="number"
              placeholder="Enter phoneNumber"
              value={newStudent.phoneNumber}
              onChange={(e) => setNewStudent({ ...newStudent, phoneNumber: e.target.value })}
            /><br /><br />
            <AddStudentInput
              type="password"
              placeholder="Enter password"
              value={newStudent.password}
              onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
            /><br /><br />
            <AddStudentButton type="submit">Add Student</AddStudentButton>
          </AddStudentForm>
          <StudentList>
            {students.map((student) => (
              <StudentItem key={student.id}>{student.name} - {student.rollNo} - {student.cardID} - {student.email} - {student.branch} - {student.phoneNumber} - {student.password}</StudentItem>
            ))}
          </StudentList>
        </StudentsContent>
      </Content>
    </StudentsContainer>
  );
};

export default Students;
