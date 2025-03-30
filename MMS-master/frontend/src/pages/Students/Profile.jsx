import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import {
  ProfileContainer,
  SidebarContainer,
  Content,
  ProfileHeader,
  ProfileInfo,
  ProfileDetail,
  Label,
  Value,
} from '../../styles/SettingsProfileStyles';

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedStudent = localStorage.getItem("student");
    if (!storedStudent) {
      alert("Please log in first");
      navigate("/student/login");
    } else {
      setStudent(JSON.parse(storedStudent));
    }
  }, []);

  return (
    <ProfileContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <ProfileHeader>Profile</ProfileHeader>
        {student ? (
          <ProfileInfo>
            <ProfileDetail>
              <Label>Name:</Label>
              <Value>{student?.name || "N/A"}</Value>
            </ProfileDetail>
            <ProfileDetail>
              <Label>Branch:</Label>
              <Value>{student?.branch || "N/A"}</Value>
            </ProfileDetail>
            <ProfileDetail>
              <Label>Card ID:</Label>
              <Value>{student?.cardID || "N/A"}</Value>
            </ProfileDetail>
            <ProfileDetail>
              <Label>Phone Number:</Label>
              <Value>{student?.phoneNumber || "N/A"}</Value>
            </ProfileDetail>
            <ProfileDetail>
              <Label>Roll No:</Label>
              <Value>{student?.rollNo || "N/A"}</Value>
            </ProfileDetail>
            <ProfileDetail>
              <Label>Email:</Label>
              <Value>{student?.email || "N/A"}</Value>
            </ProfileDetail>
          </ProfileInfo>
        ) : (
          <h2>Loading details...</h2>
        )}
      </Content>
    </ProfileContainer>
  );
};

export default StudentProfile;
