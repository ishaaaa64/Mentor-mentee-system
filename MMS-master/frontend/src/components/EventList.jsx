import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Events, Event } from "../styles/EventCalendarStyles";

const EventList = ({ events, onDelete, onEdit, allowEdit }) => {
  return (
    <Events>
      <h2>Upcoming Events</h2>
      {events.length > 0 ? (
        events.map((event, index) => (
          <Event key={index}>
            <strong>{event.event}</strong>
            {allowEdit && (
              <>
                {/* <FaEdit onClick={() => onEdit(index)} style={{ marginLeft: "10px", cursor: "pointer" }} /> */}
                <FaTrash onClick={() => onDelete(event._id)} style={{ marginLeft: "10px", cursor: "pointer", color: "red" }} />
              </>
            )}
          </Event>
        ))
      ) : (
        <p>No events available</p>
      )}
    </Events>
  );
};

export default EventList;
