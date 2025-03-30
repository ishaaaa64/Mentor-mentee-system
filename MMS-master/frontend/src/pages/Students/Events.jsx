import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { getAllEvents } from "../../components/eventService";
import EventList from "../../components/EventList";
import { EventCalendarContainer, Content } from "../../styles/EventCalendarStyles";

const StudentEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setEvents(await getAllEvents());
    }
    fetchData();
  }, []);

  return (
    <EventCalendarContainer>
      <Sidebar />
      <Content>
        <h1>Student Event Calendar</h1>
        <EventList events={events} allowEdit={false} />
      </Content>
    </EventCalendarContainer>
  );
};

export default StudentEvents;
