import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import AdminNav from "../AdminNav";

const TPerformance = () => {
  const { teamId } = useParams();
  const [performance, setPerformance] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updateData, setUpdateData] = useState({ studentId: "", marks: "", attendance: "" });

  // Fetch performance data
  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/team/${teamId}/performance`);
        setPerformance(response.data.performance);
        setTeamName(response.data.teamName);
      } catch (err) {
        setError("Failed to fetch performance data");
      } finally {
        setLoading(false);
      }
    };

    fetchPerformance();
  }, [teamId]);

  // Handle input changes
  const handleChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  // Update performance
  const handleUpdate = async (studentId) => {
    try {
      await axios.post(`http://localhost:5000/api/team/${teamId}/performance`, {
        studentId,
        marks: updateData.marks,
        attendance: updateData.attendance,
      });
      alert("Performance updated successfully!");
      window.location.reload(); // Refresh data
    } catch (error) {
      alert("Failed to update performance");
    }
  };

  if (loading) return <p style={styles.loading}>Loading...</p>;
  if (error) return <p style={styles.error}>{error}</p>;

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <AdminNav styles={styles} teamId={teamId}/>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <h2 style={styles.heading}>Performance Details - {teamName}</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Student ID</th>
              <th style={styles.th}>Marks</th>
              <th style={styles.th}>Attendance</th>
              <th style={styles.th}>Update</th>
            </tr>
          </thead>
          <tbody>
            {performance.map((student, index) => (
              <tr key={index}>
                <td style={styles.td}>{student.studentId}</td>
                <td style={styles.td}>{student.marks}</td>
                <td style={styles.td}>{student.attendance}%</td>
                <td style={styles.td}>
                  <input
                    type="number"
                    name="marks"
                    placeholder="Marks"
                    value={updateData.marks}
                    onChange={handleChange}
                    style={styles.input}
                  />
                  <input
                    type="number"
                    name="attendance"
                    placeholder="Attendance"
                    value={updateData.attendance}
                    onChange={handleChange}
                    style={styles.input}
                  />
                  <button onClick={() => handleUpdate(student.studentId)} style={styles.button}>
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Inline CSS Styles
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    backgroundColor: "#f8f9fa",
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#343a40",
    color: "white",
    padding: "20px",
    position: "fixed",
    height: "100%",
  },
  logo: {
    textAlign: "center",
    fontSize: "20px",
    marginBottom: "20px",
    fontWeight: "bold",
  },
  navList: {
    listStyleType: "none",
    padding: 0,
  },
  navItem: {
    marginBottom: "15px",
  },
  navLink: {
    textDecoration: "none",
    color: "white",
    fontSize: "18px",
    padding: "10px",
    display: "block",
    borderRadius: "5px",
    transition: "0.3s",
  },
  mainContent: {
    marginLeft: "270px",
    padding: "20px",
    width: "100%",
  },
  heading: {
    fontSize: "24px",
    color: "#007BFF",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    backgroundColor: "white",
  },
  th: {
    border: "1px solid #ddd",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    textAlign: "left",
  },
  td: {
    border: "1px solid #ddd",
    padding: "10px",
  },
  input: {
    width: "80px",
    padding: "5px",
    margin: "5px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    padding: "5px 10px",
    color: "white",
    backgroundColor: "#28a745",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "5px",
  },
  buttonHover: {
    backgroundColor: "#218838",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
  loading: {
    textAlign: "center",
    color: "#007BFF",
  },
};

export default TPerformance;
