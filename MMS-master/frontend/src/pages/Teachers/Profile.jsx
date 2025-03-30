// TeacherProfileSection.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { ProfileContainer, SidebarContainer, Content, ProfileHeader, ProfileDetails, ProfileLabel, ProfileInfo, EditButton } 
from '../../styles/SettingsProfileStyles'; 

const TeacherProfileSection = () => {
  const [teacherInfo, setTeacherInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTeacher = localStorage.getItem('teacher');

    if (!storedTeacher) {
      alert("Please log in first");
      navigate("/teacher/login");
    } else {
      const parsedTeacher = JSON.parse(storedTeacher);

      // Fetch updated teacher profile from the backend
      fetch(`http://localhost:4000/api/v1/teachers/profile?email=${parsedTeacher.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setTeacherInfo(data.teacher);
          } else {
            alert("Failed to fetch teacher profile.");
          }
        })
        .catch((err) => console.error("Error fetching teacher profile:", err));
    }
  }, [navigate]);

  return (
    <ProfileContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <ProfileHeader>Profile Details</ProfileHeader>
        { teacherInfo ? (
          <ProfileInfo>
          <ProfileDetails>
          <ProfileLabel>Name:</ProfileLabel>
          <ProfileInfo>{teacherInfo?.name || "N/A"}</ProfileInfo>
          <ProfileLabel>Email:</ProfileLabel>
          <ProfileInfo>{teacherInfo?.email || "N/A"}</ProfileInfo>
          <ProfileLabel>Phone:</ProfileLabel>
          <ProfileInfo>{teacherInfo?.phno || "N/A"}</ProfileInfo>
          <ProfileLabel>Subject:</ProfileLabel>
          <ProfileInfo>{teacherInfo?.subject || "N/A"}</ProfileInfo>
        </ProfileDetails>
        {/* <EditButton>Edit Profile</EditButton> */}
        </ProfileInfo>
      ) : (
        <h2>Loading details...</h2>
      )}
      </Content>
    </ProfileContainer>
  );
};

export default TeacherProfileSection;
