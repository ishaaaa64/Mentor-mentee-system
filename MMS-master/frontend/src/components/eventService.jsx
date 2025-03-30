import axios from "axios";

const API_URL = "http://localhost:4000/api/v1/events";

export const getAllEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/getall`);
    return response.data.events || [];
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

export const addEvent = async (eventData) => {
  try {
    const response = await axios.post(API_URL, eventData);
    return response.data.event;
  } catch (error) {
    console.error("Error adding event:", error);
    throw error;
  }
};

export const deleteEvent = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};
