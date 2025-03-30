import { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import { ProfileContainer } from "../../styles/SettingsProfileStyles";
import { Content, SidebarContainer } from "../../styles/AnnouncementStyles";
import Sidebar from "./Sidebar";
import contexts from "../../components/ContextApi";

const MessagingPage = () => {
  let { ContextDetails } = useContext(contexts)
  // const studentId = localStorage.getItem("studentId");
  let studentId = ContextDetails.StudentId
		let email = ContextDetails.StudentEmail
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [groupId, setGroupId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [requestId, setRequestId] = useState(null);
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    // axios.get("http://localhost:4000/api/v1/teachers").then((res) => {//by client
    axios.get("http://localhost:4000/api/v1/teachers/getall").then((res) => {//by dev
      console.log(res)

      setTeachers(res.data.teachers || []);
    });
  }, []);

  useEffect(() => {
    if (!selectedTeacher) return;
    
    axios.get(`http://localhost:4000/api/v1/requests/student?studentId=${studentId}&teacherId=${selectedTeacher}`).then((res) => {
      if (res.data.success && res.data.request) {
        setRequestId(res.data.request._id);
        setStatus(res.data.request.status);
        setGroupId(res.data.request.groupId);
      } else {
        setRequestId(null);
        setStatus("Pending");
        setGroupId("");
      }
    });
  }, [selectedTeacher, studentId]);

  const fetchMessages = useCallback(() => {
    if (!requestId) return;
    axios.get(`http://localhost:4000/api/v1/messages/${requestId}`).then((res) => {
      setMessages(res.data.messages || []);
    });
  }, [requestId]);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [fetchMessages]);

  const sendRequest = () => {
    if (!selectedTeacher || !projectDetails || !groupId) return;
    axios.post("http://localhost:4000/api/v1/requests/send", { studentId, teacherId: selectedTeacher, projectDetails, groupId }).then((res) => {
      console.log(res)
      setRequestId(res.data.request._id);
    });
  };

  const sendMessage = () => {
    if (!message.trim() || !requestId) return;
    axios.post("http://localhost:4000/api/v1/messages/send", { requestId, sender: studentId, message }).then(() => {
      setMessage("");
      fetchMessages();
      alert("request sent successfully!!");
    });
  };

  return (
     <ProfileContainer>
          <SidebarContainer>
            <Sidebar />
          </SidebarContainer>
          <Content>
    <div style={styles.container}>
      <h2 style={styles.heading}>Mentorship Requests & Chat</h2>

      <select onChange={(e) => setSelectedTeacher(e.target.value)} value={selectedTeacher} style={styles.select}>
        <option value="">Select a Teacher</option>
        {teachers.map((teacher) => {
          
         
          return(
          <option key={teacher._id} value={teacher._id}>{teacher.name}</option>
        )})}
      </select>

      {selectedTeacher && status === "Pending" && (
        <div style={styles.requestContainer}>
          <input type="text" placeholder="Project Details" value={projectDetails} onChange={(e) => setProjectDetails(e.target.value)} style={styles.input} />
          <input type="text" placeholder="Group ID" value={groupId} onChange={(e) => setGroupId(e.target.value)} style={styles.input} />
          <button onClick={sendRequest} style={styles.sendRequestBtn}>Send Request</button>
        </div>
      )}

      {status === "Accepted" && (
        <div style={styles.chatContainer}>
          <div style={styles.messageBox}>
            {messages.map((msg, index) => (
              <div key={index} style={msg.sender === studentId ? styles.sentMessage : styles.receivedMessage}>
                {msg.message}
              </div>
            ))}
          </div>
          <div style={styles.inputContainer}>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} style={styles.chatInput} />
            <button onClick={sendMessage} style={styles.sendBtn}>Send</button>
          </div>
        </div>
      )}
    </div></Content></ProfileContainer>
  );
};

const styles = {
  container: {
    width: "50%",
    margin: "20px auto",
    padding: "20px",
    background: "#f5f5f5",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "10px",
  },
  select: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  requestContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "10px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  sendRequestBtn: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  chatContainer: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  messageBox: {
    height: "200px",
    overflowY: "auto",
    background: "#fff",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  sentMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px",
    borderRadius: "10px",
    margin: "5px 0",
    maxWidth: "60%",
    textAlign: "right",
  },
  receivedMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#ddd",
    padding: "10px",
    borderRadius: "10px",
    margin: "5px 0",
    maxWidth: "60%",
    textAlign: "left",
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
  },
  chatInput: {
    flex: 1,
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  sendBtn: {
    padding: "10px",
    backgroundColor: "#008CBA",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default MessagingPage;
