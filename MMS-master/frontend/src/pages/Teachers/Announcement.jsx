import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import styled, { ThemeProvider } from 'styled-components';
import { FaMoon, FaSun, FaEdit, FaTrash } from 'react-icons/fa';
import {
  AnnouncementContainer,
  Content,
  Title,
  AnnouncementForm,
  FormGroup,
  Label,
  TextArea,
  Button,
  AnnouncementList,
  AnnouncementItem,
  AnnouncementContent
} from '../../styles/AnnouncementStyles';

const lightTheme = {
  background: "#ffffff",
  color: "#333",
  buttonBg: "#007bff",
  buttonColor: "#fff",
  inputBg: "#fff",
  inputColor: "#000",
  announcementBg: "#f8f9fa",
  announcementText: "#000",
};

const darkTheme = {
  background: "#222",
  color: "#fff",
  buttonBg: "#444",
  buttonColor: "#ddd",
  inputBg: "#333",
  inputColor: "#fff",
  announcementBg: "#444",
  announcementText: "#fff",
};

const ThemeWrapper = styled.div`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  min-height: 100vh;
  transition: 0.3s;
`;

const ToggleTheme = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;

const StyledAnnouncementItem = styled(AnnouncementItem)`
  background: ${(props) => props.theme.announcementBg};
  color: ${(props) => props.theme.announcementText};
  padding: 10px;
  border-radius: 5px;
  margin: 5px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CheckAnnouncementSection = () => {
  const [announcement, setAnnouncement] = useState('');
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/announcements/getall');
      setAnnouncements(response.data.announcements || []);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      setError('Error fetching announcements');
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!announcement.trim()) {
      setError('Announcement cannot be empty');
      return;
    }
    try {
      if (editingId) {
        const response = await axios.put(`http://localhost:4000/api/v1/announcements/${editingId}`, {
          announcement: announcement,
        });
        setAnnouncements((prevAnnouncements) =>
          prevAnnouncements.map((ann) => (ann._id === editingId ? response.data.announcement : ann))
        );
        setEditingId(null);
      } else {
        const response = await axios.post('http://localhost:4000/api/v1/announcements', {
          announcement: announcement,
        });
        setAnnouncements((prevAnnouncements) => [...prevAnnouncements, response.data.announcement]);
      }
      setAnnouncement('');
      setError(null);
    } catch (error) {
      console.error('Error sending announcement:', error);
      setError('Error sending announcement');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/announcements/${id}`);
      setAnnouncements((prevAnnouncements) => prevAnnouncements.filter((announcement) => announcement._id !== id));
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };

  const handleEdit = (id) => {
    const announcementToEdit = announcements.find((ann) => ann._id === id);
    setAnnouncement(announcementToEdit.announcement);
    setEditingId(id);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <ThemeWrapper>
        <AnnouncementContainer>
          <Sidebar />
          <Content>
            <ToggleTheme onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
            </ToggleTheme>
            <Title>Announcement</Title>
            <AnnouncementForm onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="announcement">Announcement:</Label>
                <TextArea
                  id="announcement"
                  value={announcement}
                  onChange={(e) => setAnnouncement(e.target.value)}
                  required
                  rows={4}
                  cols={50}
                />
              </FormGroup>
              <Button type="submit">{editingId ? "Update Announcement" : "Send Announcement"}</Button>
            </AnnouncementForm>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <h2>Announcements</h2>
            <AnnouncementList>
              {announcements.length > 0 ? (
                announcements.map((announcement) => (
                  <StyledAnnouncementItem key={announcement._id}>
                    <AnnouncementContent>{announcement.announcement}</AnnouncementContent>
                    <div>
                      <FaEdit onClick={() => handleEdit(announcement._id)} style={{ marginRight: '10px', cursor: 'pointer' }} />
                      <FaTrash onClick={() => handleDelete(announcement._id)} style={{ cursor: 'pointer', color: 'red' }} />
                    </div>
                  </StyledAnnouncementItem>
                ))
              ) : (
                <p>No announcements available</p>
              )}
            </AnnouncementList>
          </Content>
        </AnnouncementContainer>
      </ThemeWrapper>
    </ThemeProvider>
  );
};

export default CheckAnnouncementSection;
