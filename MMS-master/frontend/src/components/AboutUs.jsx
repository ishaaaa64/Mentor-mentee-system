import React from 'react';
import styled, { keyframes } from 'styled-components';

const AboutUs = () => {
    return (
        <Container>
            <ContentWrapper>
                <Title>About Us</Title>
                <Description>
                    Welcome to our platform! We are committed to providing an immersive experience 
                    where technology meets innovation. Our goal is to foster growth, creativity, and 
                    excellence in every step of the journey.
                </Description>
                <Card>
                    <CardTitle>Who We Are</CardTitle>
                    <CardText>
                        We are a team of dedicated professionals passionate about empowering learners 
                        and professionals through technology, mentorship, and collaboration.
                    </CardText>
                </Card>
                <Card>
                    <CardTitle>Our Vision</CardTitle>
                    <CardText>
                        To build a community where knowledge, creativity, and futuristic technology 
                        drive success and innovation.
                    </CardText>
                </Card>
                <NeonGlow />
            </ContentWrapper>
        </Container>
    );
};

export default AboutUs;

// 🔥 Animations & Effects
const gradientAnimation = keyframes`
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 40px;
    background: linear-gradient(120deg, #0f172a, #1e293b, #312e81);
    background-size: 300% 300%;
    animation: ${gradientAnimation} 8s ease infinite;
    color: #ffffff;
    position: relative;
`;

const ContentWrapper = styled.div`
    text-align: center;
    max-width: 800px;
    position: relative;
    z-index: 1;
`;

const Title = styled.h1`
    font-size: 2.8rem;
    font-weight: bold;
    color: #00e6e6; /* Neon Cyan */
    text-shadow: 0px 0px 20px rgba(0, 230, 230, 0.8);
    margin-bottom: 20px;
`;

const Description = styled.p`
    font-size: 1.2rem;
    color: #cbd5e1;
    line-height: 1.6;
    margin-bottom: 30px;
`;

const Card = styled.div`
    background: rgba(255, 255, 255, 0.1);
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0px 4px 8px rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    margin-bottom: 20px;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0px 0px 15px rgba(255, 0, 255, 0.6); /* Neon Magenta */
    }
`;

const CardTitle = styled.h2`
    font-size: 1.8rem;
    color: #ff00ff; /* Neon Magenta */
    text-shadow: 0px 0px 10px rgba(255, 0, 255, 0.8);
`;

const CardText = styled.p`
    font-size: 1rem;
    color: #cbd5e1;
    line-height: 1.5;
`;

const NeonGlow = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 350px;
    height: 350px;
    background: radial-gradient(circle, rgba(0, 255, 255, 0.2) 10%, transparent 80%);
    transform: translate(-50%, -50%);
    z-index: 0;
    pointer-events: none;
`;
