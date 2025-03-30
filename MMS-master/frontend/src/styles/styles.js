import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

/* 🔥 Neon Glow Animation */
const glow = keyframes`
  0% { filter: drop-shadow(0px 0px 5px rgba(0, 255, 255, 0.5)); }
  50% { filter: drop-shadow(0px 0px 15px rgba(0, 255, 255, 1)); }
  100% { filter: drop-shadow(0px 0px 5px rgba(0, 255, 255, 0.5)); }
`;

/* 🔥 Navbar with a Glassmorphism Effect */
export const Navbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 30px;
  background: rgba(14, 60, 195, 0.1);
  backdrop-filter: blur(10px);
  box-shadow: 0px 4px 10px rgba(208, 147, 16, 0.1);
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-family: "Times New Roman", serif;
  z-index: 1500;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`;

/* 🔥 Interactive Logo */
export const Logo = styled.img`
  width: 80px;
  height: auto;
  transition: transform 0.5s ease-in-out;

  &:hover {
    transform: scale(1.1) rotate(2deg);
    animation: ${glow} 1.5s infinite alternate;
  }
`;

/* 🔥 Mentor-Mentee Title */
export const MentorMenteeTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffcc00;
  text-shadow: 0px 0px 10px rgba(255, 204, 0, 0.8);
  margin: 0 auto;
  font-family: 'Poppins', sans-serif;
  flex-grow: 1;
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
    text-align: center;
  }
`;

/* 🔥 Navigation Links */
export const NavigationLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-left: auto;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    margin-left: 0;
  }
`;

/* 🔥 NavLink - Neon Glow */
export const NavLink = styled(Link)`
  margin-right: 19px;
  color: white;
  text-decoration: none;
  font-size: 25px;
  font-weight: bolder;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: rgb(55, 242, 242);
    text-shadow: 0px 0px 10px rgba(55, 242, 242, 0.8);
  }

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

/* 🔥 Buttons with Depth & Shadow */
export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 35px;
  padding: 0px;
  border-radius: 8px;
  box-shadow: 0px 0px 15px rgba(233, 32, 152, 0.6);
  transition: all 0.3s ease-in-out;
  
  &:hover {
    transform: scale(1.08);
    box-shadow: 0px 0px 20px white;
    background-color: rgba(158, 147, 154, 0.2);
  }

  @media screen and (max-width: 768px) {
    margin-right: 10px;
  }
`;

/* 🔥 Gradient Button */
export const LoginButton = styled.button`
  background: linear-gradient(90deg, #ff7e5f, #feb47b);
  color: white;
  border: none;
  padding: 12px 25px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: #ffcc00;
    box-shadow: 0px 0px 10px rgba(255, 215, 0, 0.8);
    transform: scale(1.05);
  }
`;
