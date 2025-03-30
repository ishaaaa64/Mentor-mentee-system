import React from 'react';
import styled, { keyframes } from 'styled-components';
import maam from "../assets/maam.png";
import man from "../assets/sir.png"; 

const coordinators = [
  {
    name: "Dr. Neelam Sharma",
    designation: "Associate Professor",
    department: "Computer Science",
    email: "sharmaneelam27@gmail.com",
    message: "I am honored to guide students through this mentor-mentee system. Let's grow together!",
    image: maam
  },
  {
    name: "Dr. Deepak Kumar",
    designation: "Assistant Professor",
    department: "Computer Science",
    email: "deepakkumar@banasthali.in",
    message: "Mentorship is the key to success. I am excited to be a part of your journey!",
    image: man
  }
];

const CoordinatorMessage = () => {
  return (
    <Container>
      <Title>Coordinator's Message</Title>
      <CardContainer>
        {coordinators.map((coordinator, index) => (
          <Card key={index}>
            <ImageContainer>
              <Image src={coordinator.image} alt={coordinator.name} />
            </ImageContainer>
            <CardContent>
              <Name>{coordinator.name}</Name>
              <Designation>{coordinator.designation}</Designation>
              <Department>{coordinator.department}</Department>
              <Email href={`mailto:${coordinator.email}`}>{coordinator.email}</Email>
              <Message>{coordinator.message}</Message>
            </CardContent>
          </Card>
        ))}
      </CardContainer>
    </Container>
  );
};

export default CoordinatorMessage;

// Glow effect for cards
const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(248,180,0,0.3); }
  50% { box-shadow: 0 0 20px rgba(248,180,0,0.8); }
  100% { box-shadow: 0 0 5px rgba(248,180,0,0.3); }
`;

// Animated Title Glow Effect
const titleGlow = keyframes`
  0% { text-shadow: 0 0 10px #ffb400; }
  50% { text-shadow: 0 0 20px #ffcc00; }
  100% { text-shadow: 0 0 10px #ffb400; }
`;

// Styled Components

const Container = styled.div`
  text-align: center;
  padding: 40px;
  background: linear-gradient(to right,rgb(53, 44, 78),rgb(20, 5, 5));
  min-height: 100vh;
  color: #ffffff;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #f8b400;
  text-shadow: 2px 2px 15px rgba(248, 180, 0, 0.7);
  animation: ${titleGlow} 1.5s infinite alternate;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const Card = styled.div`
  background: #222;
  width: 370px;
  border-radius: 15px;
  overflow: hidden;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  border: 5px solid rgba(142, 136, 135, 0.2);
  box-shadow: 0px 4px 8px rgba(255, 255, 255, 0.1);

  &:hover {
    transform: scale(1.05);
    animation: ${glow} 2.5s infinite alternate;
  }
`;

const ImageContainer = styled.div`
  overflow: hidden;
  border-radius: 12px 12px 0 0;
`;

const Image = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  transition: transform 0.5s ease-in-out, filter 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
    filter: brightness(1.25);
  }
`;

const CardContent = styled.div`
  padding: 20px;
  background:rgb(225, 81, 55);
  transition: background 0.3s ease-in-out;

  &:hover {
    background: #333;
  }
`;

const Name = styled.h2`
  margin: 10px 0;
  color: #f8b400;
  font-size: 24px;
  text-shadow: 0px 0px 8px rgba(248, 180, 0, 0.8);
`;

const Designation = styled.h3`
  margin: 5px 0;
  font-size: 16px;
  color: #bbb;
  font-weight: normal;
`;

const Department = styled.h4`
  margin: 5px 0;
  font-size: 15px;
  color: #ccc;
  font-weight: normal;
`;

const Email = styled.a`
  font-size: 14px;
  color: #f8b400;
  text-decoration: none;
  margin-bottom: 10px;
  display: block;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
    text-shadow: 0px 0px 10px rgba(194, 16, 243, 0.9);
  }
`;

const Message = styled.p`
  font-size: 14px;
  color: #dddddd;
  line-height: 1.4;
`;
