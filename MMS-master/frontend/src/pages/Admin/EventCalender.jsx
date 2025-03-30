import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
//import { getAllEvents, addEvent, deleteEvent } from "../../components/eventService";
import EventList from "../../components/EventList";
import {
  EventCalendarContainer,
  Content,
  AddEventForm,
  EventInput,
  AddEventButton,
} from "../../styles/EventCalendarStyles";

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/events/getall');
        console.log("Fetched Events:", response.data);
        if (response.data.success) {
          setEvents(response.data.events);
        } else {
          console.error("Failed to fetch events:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }
    fetchData();
  }, []);

  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (!newEvent.trim()) return;

    try {
      const response = await axios.post('http://localhost:4000/api/v1/events/', { 
        event: newEvent,
      date: new Date().toISOString() 
    });

      if (response.data.success) {
        setEvents([...events, response.data.event]);
        setNewEvent("");
      } else {
        console.error("Failed to add event:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/v1/events/${id}`);
      
      if (response.data.success) {
        setEvents(events.filter((event) => event._id !== id));
      } else {
        console.error("Failed to delete event:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <EventCalendarContainer>
      <Sidebar />
      <Content>
        <h1>Events</h1>
        <AddEventForm onSubmit={handleAddEvent}>
          <EventInput type="text" value={newEvent} onChange={(e) => setNewEvent(e.target.value)} placeholder="Enter Event Title" />
          <AddEventButton type="submit">Add Event</AddEventButton>
        </AddEventForm>
        <EventList events={events} onDelete={handleDeleteEvent} allowEdit={true} />
      </Content>
    </EventCalendarContainer>
  );
};

export default AdminEvents;
