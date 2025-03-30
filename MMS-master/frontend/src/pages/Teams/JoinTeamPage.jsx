import { useParams, useNavigate } from "react-router-dom";

const JoinTeamPage = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    // navigate(`/team/${teamId}`);//by client
    navigate(`/teams/team/${teamId}`);//by Dev
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>You have been invited to join Team {teamId}</h2>
      <button onClick={handleGoToDashboard} style={styles.button}>
        Go to Team Dashboard
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "24px",
    color: "#007BFF",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default JoinTeamPage;
