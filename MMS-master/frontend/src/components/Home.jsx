import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import { 
  Navbar, 
  Logo, 
  NavigationLinks, 
  NavLink, 
  ButtonsContainer, 
  LoginButton 
} from '../styles/styles'; // Ensure correct path
import bvgate from "../assets/bvgate.jpg"; 
import department from "../assets/department.webp"; 
import soa from "../assets/soa.jpg"; 
import auto1 from "../assets/auto1.jpg"; 
import cms from "../assets/cms.jpg";
import apaji from "../assets/apaji.jpg";
const images = [bvgate, department, auto1, cms, soa, apaji];

const Home = () => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    images.forEach((image) => {
      const img = new Image();
      img.src = image;
    });

    const interval = setInterval(() => {
      setIsAnimating(false);
      setTimeout(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        setIsAnimating(true);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleLoginClick = () => {
    navigate('/choose-user');
  };

  const handleTeamRegisterClick = () => {
    navigate('/teams/register');
  };

  return (
    <>
      <Navbar>
        <Logo src="/logo1.png" alt="Logo" />
        
        {/* Mentor-Mentee System Title inside Navbar */}
        <MentorMenteeTitle>Mentor-Mentee System</MentorMenteeTitle>

        <NavigationLinks>
          <NavLink to="/AboutUs">About Us</NavLink>
          <NavLink to="http://www.banasthali.org/banasthali/wcms/en/home/" target="_blank">Banasthali</NavLink>
          <NavLink to="/Coordinator">Message</NavLink>
          <NavLink to="/teacher-details">Mentors</NavLink>
        </NavigationLinks>
        {/* <button 
            onClick={handleTeamRegisterClick} 
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "10px 15px",
              marginLeft: "10px",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
              fontSize: "16px"
            }}
          >
            Team Register
          </button>  */}
          
        <ButtonsContainer>
          <button onClick={handleTeamRegisterClick}
          style={{
            backgroundColor: "4CAF50",
            color:"white",
            padding:"10px 15px",
            marginLeft:"10px",
            border:"none",
            cursor:"pointer",
            borderRadius:"5px",
            fontSize:"16px",
          }}>
            Team Register
            </button>
          <LoginButton onClick={handleLoginClick}>Sign In</LoginButton>
        </ButtonsContainer>
      </Navbar>

      <HeroSection>
        <ImageSlider 
          key={currentImage}
          style={{ backgroundImage: `url(${images[currentImage]})` }} 
          $isAnimating={isAnimating}
        />
      </HeroSection>
    </> 
  );
};

export default Home;

// 🔥 Styles
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const zoomOutEffect = keyframes`
  from { transform: scale(1.3); }
  to { transform: scale(0.998); }
`;

const HeroSection = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const ImageSlider = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: background-image 0.5s ease-in-out;
  ${({ $isAnimating }) =>
    $isAnimating &&
    css`
      animation: ${zoomOutEffect} 1.5s ease-in-out;
    `}
`;

// 💡 New Mentor-Mentee Title Style inside Navbar
const MentorMenteeTitle = styled.h1`
  font-size: 50px;
  font-weight: bold;
  color:rgb(255, 255, 255);
  text-shadow: 0px 0px 10px rgba(255, 204, 0, 0.8);
  margin: 0 20px;
  font-family: 'Poppins', sans-serif;
  flex-shrink: 0;
`;
