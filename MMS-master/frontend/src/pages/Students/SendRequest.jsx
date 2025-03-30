import  { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const SendRequest = () => {
  const [studentId, setStudentId] = useState(""); // Replace with actual student ID (fetch from auth)
  const [teacherId, setTeacherId] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [groupId, setGroupId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!studentId || !teacherId || !projectDetails || !groupId) {
      setMessage("All fields are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/requests/send", {
        studentId,
        teacherId,
        projectDetails,
        groupId,
      });

      if (response.data.success) {
        setMessage("Request sent successfully!");
      } else {
        setMessage(response.data.message || "Failed to send request.");
      }
    } catch (error) {
      console.error("Error sending request:", error);
      setMessage("Internal Server Error. Please try again later.");
    }
  };

  return (
    <RequestContainer>
      <h2>Send Mentorship Request</h2>
      {message && <Message>{message}</Message>}
      <form onSubmit={handleSubmit}>
        <label>Student ID:</label>
        <input
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          placeholder="Enter your Student ID"
          required
        />

        <label>Teacher ID:</label>
        <input
          type="text"
          value={teacherId}
          onChange={(e) => setTeacherId(e.target.value)}
          placeholder="Enter Teacher's ID"
          required
        />

        <label>Project Details:</label>
        <textarea
          value={projectDetails}
          onChange={(e) => setProjectDetails(e.target.value)}
          placeholder="Describe your project..."
          required
        ></textarea>

        <label>Group ID:</label>
        <input
          type="text"
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
          placeholder="Enter Group ID"
          required
        />

        <button type="submit">Send Request</button>
      </form>
    </RequestContainer>
  );
};

export default SendRequest;

// Styled Components for CSS
const RequestContainer = styled.div`
  width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: #f9f9f9;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;

  h2 {
    margin-bottom: 10px;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  label {
    margin-top: 10px;
    text-align: left;
    font-weight: bold;
  }

  input,
  textarea {
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
  }

  button {
    margin-top: 15px;
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s ease;

    &:hover {
      background-color: #218838;
    }
  }
`;

const Message = styled.p`
  color: green;
  font-weight: bold;
  text-align: center;
`;
