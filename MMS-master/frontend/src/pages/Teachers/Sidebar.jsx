import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; 
import { BsGraphUp, BsPeople, BsPerson, BsFileText, BsBook, BsGraphDown, BsCalendar, BsGear, BsChatDots, BsCalendarEvent, BsPower, BsFillArrowLeftSquareFill } from 'react-icons/bs';

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  background-color: #2c3e50; /* Dark blue background */
  color: white;
  display: flex;
  flex-direction: column; /* Ensures Logout stays at the bottom */
  justify-content: space-between;
  overflow-y: auto;
  padding-top: 60px;
  transition: width 0.3s ease;
  z-index: 100;
`;

const SidebarTitle = styled.h3`
  color: white; /* Change text color to white */
  margin-top: 10px;
`;

const SidebarHeader = styled.div`
  padding: 0px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const SidebarNav = styled.ul`
  list-style: none;
  padding: 0;
  flex-grow: 1; /* Pushes logout to the bottom */
`;

const SidebarNavItem = styled.li`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  font-size: 18px;
  border-bottom: 1px solid #34495e;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #34495e;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  margin-left: 10px;
`;

const SidebarIcon = styled.div`
  margin-right: 10px;
`;

const Logo = styled.img`
  width: ${({ isOpen }) => (isOpen ? '100px' : '50px')};
  height: auto;
  transition: width 0.3s ease;
`;

const LogoutButton = styled.button`
  width: 100%;
  padding: 12px 20px;
  font-size: 18px;
  background-color: #e74c3c; /* Red color for logout */
  color: white;
  border: none;
  cursor: pointer;
  text-align: left;
  display: flex;
  align-items: center;
  border-top: 1px solid #c0392b;
  &:hover {
    background-color: #c0392b;
  }
`;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SidebarContainer>
      <div>
        <SidebarHeader>
          <Logo src="/logo1.png" alt="logo" isOpen={isOpen}/> 
            {isOpen && <SidebarTitle>Teacher</SidebarTitle>}
            </SidebarHeader>
        <SidebarNav>
          <SidebarNavItem>
            <SidebarIcon><BsGraphUp /></SidebarIcon>
            <StyledLink to="/teacher/dashboard">Dashboard</StyledLink>
          </SidebarNavItem>
          {/* <SidebarNavItem>
            <SidebarIcon><BsPeople /></SidebarIcon>
            <StyledLink to="/teacher/classes">Classes</StyledLink>
          </SidebarNavItem>
          <SidebarNavItem>
            <SidebarIcon><BsPeople /></SidebarIcon>
            <StyledLink to="/teacher/students">Students</StyledLink>
          </SidebarNavItem>
          <SidebarNavItem>
            <SidebarIcon><BsPerson /></SidebarIcon>
            <StyledLink to="/teacher/teachers">Teachers</StyledLink>
          </SidebarNavItem>
          <SidebarNavItem>
            <SidebarIcon><BsFileText /></SidebarIcon>
            <StyledLink to="/teacher/assignments">Assignments</StyledLink>
          </SidebarNavItem>
          <SidebarNavItem>
            <SidebarIcon><BsBook /></SidebarIcon>
            <StyledLink to="/teacher/exams">Exams</StyledLink>
          </SidebarNavItem>
          <SidebarNavItem>
            <SidebarIcon><BsGraphDown /></SidebarIcon>
            <StyledLink to="/teacher/performance">Performance</StyledLink>
          </SidebarNavItem>
          <SidebarNavItem>
            <SidebarIcon><BsCalendar /></SidebarIcon>
            <StyledLink to="/teacher/attendance">Attendance</StyledLink>
          </SidebarNavItem> */}
          <SidebarNavItem>
          <SidebarIcon>
            <BsChatDots />
          </SidebarIcon>
          <StyledLink to="/teacher/messaging" $isOpen={isOpen}>
            Messaging
          </StyledLink>
        </SidebarNavItem>

        <SidebarNavItem>
          <SidebarIcon>
            <BsChatDots />
          </SidebarIcon>
          <StyledLink to="/teacher/requests" $isOpen={isOpen}>
            Requests
          </StyledLink>
        </SidebarNavItem>
          {/* <SidebarNavItem>
            <SidebarIcon><BsChatDots /></SidebarIcon>
            <StyledLink to="/teacher/communication">Announcement</StyledLink>
          </SidebarNavItem> */}
          <SidebarNavItem>
            <SidebarIcon><BsCalendarEvent /></SidebarIcon>
            <StyledLink to="/teacher/events">Events & Calendar</StyledLink>
          </SidebarNavItem>

          {/* ✅ Teacher Profile option added before Settings */}
          <SidebarNavItem>
            <SidebarIcon><BsPerson /></SidebarIcon>
            <StyledLink to="/teacher-profile">Teacher Profile</StyledLink>
          </SidebarNavItem>

          <SidebarNavItem>
            <SidebarIcon><BsGear /></SidebarIcon>
            <StyledLink to="/teacher/settings">Settings & Profile</StyledLink>
          </SidebarNavItem>
          <SidebarNavItem>
            <SidebarIcon><BsFillArrowLeftSquareFill /></SidebarIcon>
            <StyledLink to="/">Logout</StyledLink>
          </SidebarNavItem>
        </SidebarNav>
      </div>

      {/* ✅ Logout option at the bottom */}
      {/* <LogoutButton onClick={() => alert("Logging out...")}>
        <SidebarIcon><BsPower /></SidebarIcon>
        Logout
      </LogoutButton> */}
    </SidebarContainer>
  );
};

export default Sidebar;
