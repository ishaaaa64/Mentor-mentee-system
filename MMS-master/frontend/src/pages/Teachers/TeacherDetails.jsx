import React, { useState, useEffect } from "react";

const TeacherDetails = ({ teachers, setTeachers }) => {  
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null); // Track hover state

  useEffect(() => {
    const savedTeachers = JSON.parse(localStorage.getItem("teachers")) || [];
    if (savedTeachers.length > 0 && teachers.length === 0) {
      setTeachers(savedTeachers);
    }
  }, []);

  const filteredTeachers = teachers.filter((teacher) =>
    Object.values(teacher)
      .filter(value => typeof value === "string") 
      .some((value) => value.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div style={styles.pageContainer}>
      <h2 style={styles.heading}>Teacher Details</h2>
      
      {/* Bigger Search Bar */}
      <div style={styles.searchBarContainer}>
        <input 
          type="text"
          placeholder="Search Teachers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchBar}
        />
      </div>

      <div style={styles.container}>
        {filteredTeachers.length > 0 ? (
          filteredTeachers.map((teacher, index) => (
            <div 
              key={index}
              style={{
                ...styles.card,
                ...(hoveredCard === index ? styles.cardHover : {}), // Apply hover effect
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <h3 
                style={{
                  ...styles.name,
                  ...(hoveredCard === index ? { color: "#222" } : {}), // Ensure name is visible
                }}
              >
                {teacher.name}
              </h3>
              <p style={styles.detail}><strong>Department:</strong> {teacher.department}</p>
              <p style={styles.detail}><strong>Specialization:</strong> {teacher.specialization}</p>
              <p style={styles.email}><strong>Email:</strong> {teacher.email}</p>
            </div>
          ))
        ) : (
          <p style={styles.noData}>No teachers found.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    padding: "20px",
    textAlign: "center",
    background: "linear-gradient(135deg, #1a1a1a, #2c2c2c)", // Dark gradient background
    minHeight: "100vh",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "20px",
    fontFamily: "Poppins, sans-serif",
    color: "#ffffff",
  },
  searchBarContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  searchBar: {
    width: "60%", // Increased width
    height: "50px", // Increased height
    fontSize: "1.2rem",
    padding: "10px",
    borderRadius: "25px",
    border: "2px solid #ffaa00",
    outline: "none",
    textAlign: "center",
    background: "#222",
    color: "white",
    transition: "0.3s",
    boxShadow: "0px 0px 8px rgba(255, 204, 0, 0.5)",
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
    padding: "20px",
  },
  card: {
    background: "linear-gradient(135deg, #222, #333)",
    padding: "15px",
    borderRadius: "10px",
    color: "white",
    border: "2px solid transparent",
    transition: "0.3s",
    textAlign: "left",
    boxShadow: "0px 0px 5px rgba(255, 255, 255, 0.1)",
    transform: "scale(1)", // Default scale
  },
  cardHover: {
    background: "linear-gradient(135deg, #ffcc00, #ffaa00)",
    color: "#222",
    boxShadow: "0px 0px 20px rgba(255, 204, 0, 0.8)", // Glow effect
    border: "2px solid rgba(255, 204, 0, 0.8)",
    transform: "scale(1.05)", // Slight zoom effect on hover
  },
  name: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "10px",
    fontFamily: "Poppins, sans-serif",
    color: "white", // Default color
    transition: "color 0.3s ease",
  },
  detail: {
    fontSize: "1rem",
    fontFamily: "Montserrat, sans-serif",
    opacity: "0.9",
  },
  email: {
    fontSize: "0.9rem",
    fontFamily: "Montserrat, sans-serif",
    opacity: "0.8",
    fontStyle: "italic",
  },
  noData: {
    color: "#bbb",
    fontSize: "1.2rem",
    textAlign: "center",
  },
};

export default TeacherDetails;
