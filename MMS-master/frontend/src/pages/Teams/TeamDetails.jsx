import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import AdminNav from "../AdminNav";

const TeamDetails = () => {
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/team/${teamId}`);
        setTeam(response.data);
      } catch (error) {
        setError("Failed to fetch team details.");
      }
    };

    fetchTeam();
  }, [teamId]);

  if (error) return <h2 style={styles.error}>{error}</h2>;
  if (!team) return <h2 style={styles.loading}>Loading...</h2>;

  return (
    <div style={styles.wrapper}>
      {/* Sidebar */}
      <AdminNav styles={styles} teamId={teamId} />
      {/* Main Content */}
      <div style={styles.mainContent}>
        <h2 style={styles.heading}>Team Details</h2>
        <h3 style={styles.subHeading}>Team ID: {teamId}</h3>
        <h3 style={styles.subHeading}>Team Name: {team.teamName}</h3>
        <h3 style={styles.subHeading}>Leader: {team.leaderEmail}</h3>
        
        <h3 style={styles.subHeading}>Members:</h3>
        <ul style={styles.list}>
          {team.members?.map((member, index) => (
            <li key={index} style={styles.listItem}>
              {member.name} - {member.course} - {member.email}
              <span style={member.studentId ? styles.joined : styles.pending}>
                ({member.studentId ? "Joined" : "Pending"})
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Inline Styles
const styles = {
  wrapper: { display: "flex", height: "100vh", backgroundColor: "#f8f9fa" },
  sidebar: { width: "250px", backgroundColor: "#343a40", color: "white", padding: "20px", height: "100%", position: "fixed" },
  logo: { textAlign: "center", fontSize: "20px", marginBottom: "20px", fontWeight: "bold" },
  navList: { listStyleType: "none", padding: 0 },
  navItem: { marginBottom: "15px" },
  navLink: { textDecoration: "none", color: "white", fontSize: "18px", padding: "10px", display: "block", borderRadius: "5px", transition: "0.3s" },
  mainContent: { marginLeft: "270px", padding: "20px", width: "100%" },
  heading: { fontSize: "24px", color: "#007BFF", textAlign: "center", marginBottom: "10px" },
  subHeading: { fontSize: "18px", color: "#333", marginBottom: "5px" },
  list: { listStyleType: "none", padding: 0 },
  listItem: { fontSize: "16px", backgroundColor: "#ffffff", padding: "10px", margin: "10px 0", borderRadius: "5px", boxShadow: "0px 2px 5px rgba(0,0,0,0.1)" },
  joined: { color: "green", fontWeight: "bold", marginLeft: "10px" },
  pending: { color: "red", fontWeight: "bold", marginLeft: "10px" },
  error: { color: "red", textAlign: "center", fontSize: "20px", marginTop: "50px" },
  loading: { color: "#007BFF", textAlign: "center", fontSize: "20px", marginTop: "50px" }
};

export default TeamDetails;
