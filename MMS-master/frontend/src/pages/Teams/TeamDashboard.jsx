import { Link, useParams } from "react-router-dom";
import AdminNav from "../AdminNav";

const TeamDashboard = () => {
  let {teamId}=useParams()
  return (
    <div style={styles.wrapper}>
      {/* Sidebar */}
 <AdminNav styles={styles} teamId={teamId}/>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <h2 style={styles.heading}>Welcome to the Team Dashboard</h2>
        <p style={styles.description}>
          Manage your team, view performance, and stay updated.
        </p>
      </div>
    </div>
  );
};

// Inline CSS
const styles = { 
  wrapper: { display: "flex", height: "100vh", backgroundColor: "#f8f9fa" },
  sidebar: { width: "250px", backgroundColor: "#343a40", color: "white", padding: "20px", height: "100%", position: "fixed" },
  logo: { textAlign: "center", fontSize: "20px", marginBottom: "20px", fontWeight: "bold" },
  navList: { listStyleType: "none", padding: 0 },
  navItem: { marginBottom: "15px" },
  navLink: { textDecoration: "none", color: "white", fontSize: "18px", padding: "10px", display: "block", borderRadius: "5px", transition: "0.3s" },
  mainContent: { marginLeft: "270px", padding: "20px", width: "100%" },
  heading: { fontSize: "24px", color: "#007BFF", textAlign: "center", marginBottom: "10px" },
  description: { fontSize: "16px", textAlign: "center" }
};

export default TeamDashboard;
