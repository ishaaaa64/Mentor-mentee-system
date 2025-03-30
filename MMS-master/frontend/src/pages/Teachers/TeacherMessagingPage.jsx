import { useState, useEffect } from "react";
import axios from "axios";

const TeacherMessagingPage = () => {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [messages, setMessages] = useState([]);

  // Fetch requests from the API
  useEffect(() => {
    axios
      .get("/api/teacher/requests", { params: { teacherId: "teacher_id_here" } })
      .then((response) => {
        console.log("Fetched Requests:", response.data);
        setRequests(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error("Error fetching requests:", error);
      });
  }, []);

  // Fetch messages for a particular request
  const fetchMessages = (requestId) => {
    axios
      .get(`/api/messages/${requestId}`)
      .then((response) => {
        console.log("Fetched Messages:", response.data);
        setMessages(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  };

  // Responding to a request
  const handleResponse = (requestId, status) => {
    axios
      .post("/api/teacher/respondRequest", { requestId, status })
      .then(() => {
        // Update request status locally
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request._id === requestId ? { ...request, status } : request
          )
        );
        setSelectedRequest(requestId);
        fetchMessages(requestId); // Fetch messages after updating status
      })
      .catch((error) => {
        console.error("Error updating request status:", error);
      });
  };

  // Sending a message in chat
  const handleSendMessage = () => {
    if (selectedRequest && message.trim() !== "") {
      axios
        .post("/api/sendMessage", {
          requestId: selectedRequest,
          sender: "teacher",
          message,
        })
        .then(() => {
          setMessage(""); // Clear input after sending
          fetchMessages(selectedRequest); // Refresh messages
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        });
    }
  };

  return (
    <div>
      <h2>Requests from Students</h2>
      {requests.length === 0 ? (
        <p>No requests available</p>
      ) : (
        requests.map((request) => (
          <div key={request._id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <h3>{request.studentName} (Group ID: {request.groupId})</h3>
            <p>{request.projectDetails}</p>
            <p><strong>Status:</strong> {request.status}</p>

            {/* If request is pending, allow teacher to respond */}
            {request.status === "pending" && (
              <div>
                <button onClick={() => handleResponse(request._id, "accepted")}>Accept</button>
                <button onClick={() => handleResponse(request._id, "rejected")}>Reject</button>
                <button onClick={() => handleResponse(request._id, "query")}>Query</button>
              </div>
            )}

            {/* Show chat if request is accepted or queried */}
            {(request.status === "accepted" || request.status === "query") && (
              <div>
                <h4>Chat:</h4>
                <div style={{ maxHeight: "200px", overflowY: "auto", border: "1px solid #ddd", padding: "5px" }}>
                  {/* Display messages */}
                  {selectedRequest === request._id && messages.length > 0 ? (
                    messages.map((msg, index) => (
                      <div key={index} style={{ textAlign: msg.sender === "teacher" ? "right" : "left" }}>
                        <p><strong>{msg.sender}:</strong> {msg.message}</p>
                      </div>
                    ))
                  ) : (
                    <p>No messages yet.</p>
                  )}
                </div>

                {/* Chat box */}
                <textarea
                  placeholder="Type your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="3"
                  style={{ width: "100%", marginTop: "5px" }}
                />
                <button onClick={handleSendMessage}>Send</button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default TeacherMessagingPage;
