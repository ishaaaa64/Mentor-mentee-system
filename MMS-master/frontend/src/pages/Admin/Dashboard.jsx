// AdminDashboard.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
//import EventCalendar from './EventCalender';
import Announcement from './Announcement';
//import Performance from './Performance';
import axios from 'axios';
import {
  AdminDashboardContainer,
  Content,
  TopContent,
  BottomContent,
  Section,
  SectionTitle,
  CardContainer,
  Card,
  CardTitle,
  CardContent,
} from '../../styles/DashboardStyles';

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  //const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  //const [studentPerformance, setStudentPerformance] = useState([]);
  const [teacherCount, setTeacherCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [announcementCount, setAnnouncementCount] = useState(0);


  useEffect(() => {
    fetchEvents();
    fetchAnnouncements();
    fetchStudentPerformance();
    fetchTeacherCount();
    fetchStudentCount();
    fetchAnnouncementCount();
  }, []);

  const fetchTeacherCount = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/teachers/count');
      setTeacherCount(response.data.count);
    } catch (error) {
      console.error('Error fetching teacher count:', error);
    }
  };
  
  const fetchStudentCount = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/students/count');
      setStudentCount(response.data.count);
    } catch (error) {
      console.error('Error fetching student count:', error);
    }
  };
  
  const fetchAnnouncementCount = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/announcements/count');
      setAnnouncementCount(response.data.count);
    } catch (error) {
      console.error('Error fetching announcement count:', error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/events/getall');
      setEvents(response.data.events || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/announcements/getall');
      setAnnouncements(response.data.announcements || []);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const fetchStudentPerformance = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/performance/getall');
      setStudentPerformance(response.data.performance || []);
    } catch (error) {
      console.error('Error fetching student performance:', error);
    }
  };

  return (
    <AdminDashboardContainer>
      <Sidebar />
      <Content isOpen={isOpen}>
        <TopContent>
          <Section>
            <SectionTitle>Overview</SectionTitle>
            <CardContainer>
              <Card>
                <CardTitle>Teachers</CardTitle>
                <CardContent>{teacherCount}</CardContent>
              </Card>
              <Card>
                <CardTitle>Students</CardTitle>
                <CardContent>{studentCount}</CardContent>
              </Card>
              <Card>
                <CardTitle>Announcements</CardTitle>
                <CardContent>{announcementCount}</CardContent>
              </Card>
            </CardContainer>
          </Section>

          {/* <Section>
            <EventCalendar events={events} />
          </Section> */}
        </TopContent>

        <BottomContent>
          {/* <Performance studentPerformance={studentPerformance} /> */}
          <Announcement announcements={announcements} />
        </BottomContent>
      </Content>
    </AdminDashboardContainer>
  );
};

export default AdminDashboard;
