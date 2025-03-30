// AttendanceSection.js
import React from 'react';
import Sidebar from './Sidebar';
import { AttendanceContainer, SidebarContainer, Content, AttendanceHeader, AttendanceList, AttendanceItem, 
  AttendanceDate, AttendanceStatus } 
  from '../../styles/AttendanceStyles'; 

const AttendanceSection = () => {
  // Sample attendance data
  const attendance = [
    { id: 1, date: '2024-05-01', present: true },
    { id: 2, date: '2024-05-02', present: false }
  ];

  return (
    <AttendanceContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <AttendanceHeader>Attendance</AttendanceHeader>
        <AttendanceList>
          {attendance.map(({ id, date, present }) => (
            <AttendanceItem key={id}>
              <AttendanceDate>{date}</AttendanceDate>
              <AttendanceStatus present={present}>{present ? 'Present' : 'Absent'}</AttendanceStatus>
            </AttendanceItem>
          ))}
        </AttendanceList>
      </Content>
    </AttendanceContainer>
  );
};

export default AttendanceSection;
