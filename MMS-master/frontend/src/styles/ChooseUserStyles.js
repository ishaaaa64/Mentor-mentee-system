import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ChooseUserContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg,rgb(229, 76, 11),rgb(27, 18, 134),rgb(235, 238, 15)); /* Vibrant gradient */
  background-size: 300% 300%;
  animation: gradientAnimation 6s ease infinite;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-evenly; /* Even spacing for larger screens */
  }

  @keyframes gradientAnimation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

export const UserSection = styled.div`
  text-align: center; 
  padding: 30px; /* Increased padding for better spacing */
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.3); 
  border: 5px solid rgba(90, 89, 101, 0.8);
  border-radius: 15px;
  box-shadow: 0px 6px 20px rgba(171, 30, 5, 0.6);
  width: 90%;
  max-width: 400px;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;
  display: flex;
  flex-direction: column; /* Stack title and button vertically */
  align-items: center; /* Center content */
  justify-content: center; /* Center content */
  gap: 15px; /* Add space between title and button */

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0px 8px 25px rgba(255, 165, 0, 0.9);
    border: 2px solid #ffcc00;
  }

  @media screen and (min-width: 768px) {
    margin: 20px;
    width: 45%;
  }
`;

export const Title = styled.h2`
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 10px; /* Reduce default margin */
  color: #fff;
  text-shadow: 5px 5px 5px rgba(81, 215, 18, 0.5);
  letter-spacing: 1px;
  text-align: center; /* Ensure text is centered */

  @media screen and (max-width: 768px) {
    font-size: 22px;
  }

  &:hover {
    color: rgba(247, 243, 22, 0.94);
  }
`;

export const Button = styled(Link)`
  background: linear-gradient(90deg, #4CAF50, #00C9A7);
  color: white;
  border: none;
  padding: 12px 24px;
  margin-top: 5px; /* Reduce margin-top for better spacing */
  text-decoration: none;
  cursor: pointer;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 10px rgba(0, 201, 167, 0.4);

  &:hover {
    background: linear-gradient(90deg, #00C9A7, #4CAF50);
    box-shadow: 0px 6px 15px rgba(224, 28, 181, 0.6);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  @media screen and (max-width: 768px) {
    padding: 10px 20px;
    font-size: 14px;
  }
`;
