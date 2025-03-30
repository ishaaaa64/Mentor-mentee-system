import { useContext, useEffect, useState } from "react";
import axios from "axios";
import contexts from "../../components/ContextApi";
import { ProfileContainer } from "../../styles/SettingsProfileStyles";
import { Content, SidebarContainer } from "../../styles/AnnouncementStyles";
import Sidebar from "./Sidebar";

const Requests = () => {
  const [requests, setRequests] = useState([]);

  let { ContextDetails } = useContext(contexts)
  console.log(ContextDetails)
  // const teacherId = localStorage.getItem("teacherId") || ""; // Get from local storage or auth context
  const teacherId = ContextDetails.TeacherId; // Get from local storage or auth context

  useEffect(() => {
    if (teacherId) fetchRequests();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teacherId]);

  // ✅ Fetch requests assigned to the logged-in teacher
  const fetchRequests = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/requests/teacher/${teacherId}`);
      console.log(response)
      setRequests(response.data.requests);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  // ✅ Handle request response (Accept/Reject/Query)
  const handleResponse = async (requestId, status) => {
    try {
      await axios.post("http://localhost:4000/api/v1/requests/respond", { requestId, status });
      fetchRequests(); // Refresh the request list
    } catch (error) {
      console.error("Error updating request:", error);
    }
  };

  return (
    <ProfileContainer>
    <SidebarContainer>
      <Sidebar />
    </SidebarContainer>
    <Content>
    <div style={styles.requestContainer}>
      <h2 style={styles.heading}>Student Mentorship Requests</h2>
      {requests.length === 0 ? (
        <p style={styles.noRequests}>No mentorship requests available.</p>
      ) : (
        <table style={styles.requestTable}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Student Name</th>
              <th style={styles.tableHeader}>Email</th>
              <th style={styles.tableHeader}>Project Details</th>
              <th style={styles.tableHeader}>Group ID</th>
              <th style={styles.tableHeader}>Status</th>
              <th style={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => {
              console.log(req)
              return(
              <tr key={req._id}>
                <td style={styles.tableCell}>{req?.studentName || "N/A"}</td>
                <td style={styles.tableCell}>{req?.studentEmail || "N/A"}</td>
                <td style={styles.tableCell}>{req.projectDetails}</td>
                <td style={styles.tableCell}>{req.groupId}</td>
                <td style={{ ...styles.tableCell, ...styles.status[req.status?.toLowerCase()] }}>
                  {req.status}
                </td>
                <td style={styles.tableCell}>
                  {req.status === "pending" ? (
                    <>
                      <button style={styles.acceptBtn} onClick={() => handleResponse(req._id, "Accepted")}>
                        Accept
                      </button>
                      <button style={styles.rejectBtn} onClick={() => handleResponse(req._id, "Rejected")}>
                        Reject
                      </button>
                      <button style={styles.queryBtn} onClick={() => handleResponse(req._id, "Query")}>
                        Query
                      </button>
                    </>
                  ) : (
                    <span>{req.status}</span>
                  )}
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      )}
    </div>
    </Content>
    </ProfileContainer>
  );
};

// ✅ Inline CSS Styles
const styles = {
  requestContainer: {
    padding: "20px",
    background: "#f9f9f9",
    minHeight: "100vh",
  },
  heading: {
    textAlign: "center",
    color: "#333",
  },
  noRequests: {
    textAlign: "center",
    fontSize: "16px",
    color: "#777",
  },
  requestTable: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  tableHeader: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "10px",
    textAlign: "center",
    border: "1px solid #ddd",
  },
  tableCell: {
    padding: "10px",
    textAlign: "center",
    border: "1px solid #ddd",
  },
  acceptBtn: {
    backgroundColor: "green",
    color: "white",
    padding: "5px 10px",
    border: "none",
    cursor: "pointer",
    marginRight: "5px",
    borderRadius: "5px",
  },
  rejectBtn: {
    backgroundColor: "red",
    color: "white",
    padding: "5px 10px",
    border: "none",
    cursor: "pointer",
    marginRight: "5px",
    borderRadius: "5px",
  },
  queryBtn: {
    backgroundColor: "orange",
    color: "white",
    padding: "5px 10px",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  },
  status: {
    accepted: { color: "green", fontWeight: "bold" },
    rejected: { color: "red", fontWeight: "bold" },
    query: { color: "orange", fontWeight: "bold" },
  },
};

export default Requests;
