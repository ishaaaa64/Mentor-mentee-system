import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/components/Home.jsx';
import ChooseUser from '../src/components/ChooseUser';
import AdminSignIn from '../src/components/AdminSignIn';
import StudentSignIn from '../src/components/StudentSignIn';
import TeacherSignIn from '../src/components/TeacherSignIn';
import AdminRegister from '../src/components/AdminRegister';
import AboutUs from '../src/components/AboutUs';
import Coordinator from '../src/components/Coordinator';
import StudentUpload from "./pages/Admin/StudentUpload";
import TeacherUpload from "./pages/Admin/TeacherUpload";

import AdminDashboard from '../src/pages/Admin/Dashboard';
import StudentDashboard from '../src/pages/Students/Dashboard';
import Sidebar from '../src/pages/Students/Sidebar';
import TeacherDashboard from '../src/pages/Teachers/Dashboard';

import Classes from '../src/pages/Admin/Classes';
import Exam from '../src/pages/Admin/Exam';
import Attendance from '../src/pages/Admin/Attendance';
import Performance from '../src/pages/Admin/Performance';
import Teachers from '../src/pages/Admin/Teachers';
import Students from '../src/pages/Admin/Students';
import Assignments from '../src/pages/Admin/Assignments';
import Library from '../src/pages/Admin/Library';
import EventCalender from '../src/pages/Admin/EventCalender';
import SettingsProfile from '../src/pages/Admin/SettingsProfile';
import Announcement from '../src/pages/Admin/Announcement';

import StudentAssignments from '../src/pages/Students/Assignments';
import ExamSection from '../src/pages/Students/Exams';
import PerformanceSection from '../src/pages/Students/Performance';
import AttendanceSection from '../src/pages/Students/Attendance';
import LibrarySection from './pages/Students/Library';
import CheckEventSection from './pages/Students/Events';
import AnnouncementSection from '../src/pages/Students/Announcement';
import StudentProfile from '../src/pages/Students/Profile';

import ClassSection from '../src/pages/Teachers/Classes';
import StudentSection from '../src/pages/Teachers/Students';
import TeacherSection from '../src/pages/Teachers/Teachers';
import CheckPerformanceSection from '../src/pages/Teachers/Performance';
import EventSection from '../src/pages/Teachers/Events';
import TeacherProfileSection from '../src/pages/Teachers/Profile';
import CheckAnnouncementSection from '../src/pages/Teachers/Announcement';
import AssignmentSection from '../src/pages/Teachers/Assignments';
import CheckAttendanceSection from '../src/pages/Teachers/Attendance';
import CheckExamSection from '../src/pages/Teachers/Exams';
import MessagingPage from '../src/pages/Students/MessagingPage';
import TeacherMessagingPage from '../src/pages/Teachers/TeacherMessagingPage';
import Request from './pages/Teachers/Request.jsx';
import TeacherProfile from "./pages/Teachers/TeacherProfile";
import TeacherDetails from "./pages/Teachers/TeacherDetails";
import SendRequest from './pages/Students/SendRequest.jsx';
import TeamRegister from "./pages/Teams/TeamRegister";
import TeamDashboard from "./pages/Teams/TeamDashboard";
import JoinTeamPage from "./pages/Teams/JoinTeamPage";
import TeamDetails from "./pages/Teams/TeamDetails";
import TPerformance from "./pages/Teams/TPerformance";
import TeamLeaderLogin from "./components/TeamLeaderLogin.jsx";
import JoinTeam from "./pages/Students/JoinTeam.jsx";
import contexts from "./components/ContextApi.jsx";
// import ChatComponent from './ChatComponent'; // Existing chat component
import chatDashboard from './chatDashboard.jsx'; // ✅ New import for chat dashboard

const App = () => {
  const [teachers, setTeachers] = useState([]);
  let [ContextDetails, setContextDetails] = useState({});

  return (
    <contexts.Provider value={{ ContextDetails, setContextDetails }}>
      <Router>
        <Routes>
          {/* Existing routes */}
          <Route path="/" element={<Home />} />
          <Route path="/choose-user" element={<ChooseUser />} />
          <Route exact path="/admin-signIn" element={<AdminSignIn />} />
          <Route exact path="/student-signIn" element={<StudentSignIn />} />
          <Route exact path="/teacher-signIn" element={<TeacherSignIn />} />
          <Route exact path="/admin/register" element={<AdminRegister />} />
          <Route exact path="/aboutus" element={<AboutUs />} />
          <Route exact path="/coordinator" element={<Coordinator />} />
          
          {/* Other routes */}
          <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
          <Route exact path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route exact path="/student/dashboard" element={<StudentDashboard />} />
          <Route exact path="/student/Sidebar" element={<Sidebar />} />

          {/* Chat Routes */}
          {/* <Route path="/chat" element={<ChatComponent />} /> */}
          <Route path="/chat-dashboard" element={<chatDashboard />} /> {/* ✅ New chat dashboard route */}

          {/* Admin routes */}
          <Route exact path="/admin/classes" element={<Classes />} />
          <Route exact path="/admin/exams" element={<Exam />} />
          <Route exact path="/admin/attendance" element={<Attendance />} />
          <Route exact path="/admin/performance" element={<Performance />} />
          <Route exact path="/admin/teachers" element={<Teachers />} />
          <Route exact path="/admin/students" element={<Students />} />
          <Route exact path="/admin/assignments" element={<Assignments />} />
          <Route exact path="/admin/library" element={<Library />} />
          <Route exact path="/admin/communication" element={<Announcement />} />
          <Route exact path="/admin/events" element={<EventCalender />} />
          <Route exact path="/admin/settings" element={<SettingsProfile />} />

          {/* Student routes */}
          <Route path="/student/settings" element={<StudentProfile />} />
          <Route path="/student/MessagingPage" element={<MessagingPage />} />
          <Route path="/student/send-request" element={<SendRequest />} />
          <Route path="/student/assignments" element={<StudentAssignments />} />
          <Route path="/student/exams" element={<ExamSection />} />
          <Route path="/student/performance" element={<PerformanceSection />} />
          <Route path="/student/attendance" element={<AttendanceSection />} />
          <Route path="/student/library" element={<LibrarySection />} />
          <Route path="/student/events" element={<CheckEventSection />} />
          <Route path="/student/announcement" element={<AnnouncementSection />} />
          <Route path="/student/join-team" element={<JoinTeam />} />

          {/* Teacher routes */}
          <Route path="/teacher/messaging" element={<TeacherMessagingPage />} />
          <Route path="/teacher/requests" element={<Request />} />
          <Route exact path="/teacher-profile" element={<TeacherProfile teachers={teachers} setTeachers={setTeachers} />} />
          <Route exact path="/teacher-details" element={<TeacherDetails teachers={teachers} setTeachers={setTeachers} />} />
          <Route path="/teacher/classes" element={<ClassSection />} />
          <Route path="/teacher/students" element={<StudentSection />} />
          <Route path="/teacher/teachers" element={<TeacherSection />} />
          <Route path="/teacher/performance" element={<CheckPerformanceSection />} />
          <Route path="/teacher/events" element={<EventSection />} />
          <Route path="/teacher/profile" element={<TeacherProfileSection />} />
          <Route path="/teacher/announcement" element={<CheckAnnouncementSection />} />
          <Route path="/teacher/assignments" element={<AssignmentSection />} />
          <Route path="/teacher/attendance" element={<CheckAttendanceSection />} />
          <Route path="/teacher/exams" element={<CheckExamSection />} />

          {/* Team routes */}
          <Route path="/team/register" element={<TeamRegister />} />
          <Route path="/team/dashboard" element={<TeamDashboard />} />
          <Route path="/team/details" element={<TeamDetails />} />
          <Route path="/team/performance" element={<TPerformance />} />
          <Route path="/team/join" element={<JoinTeamPage />} />
          <Route path="/team-leader-login" element={<TeamLeaderLogin />} />
        </Routes>
      </Router>
    </contexts.Provider>
  );
};

export default App;
