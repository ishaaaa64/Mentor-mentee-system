// AdminDashboardStyles.js
import styled from 'styled-components';

export const AdminDashboardContainer = styled.div`
  display: flex;
`;

export const Content = styled.div`
  flex: 1;
  padding: 10px;
  margin-left: ${({ isOpen }) => (isOpen ? '250px' : '10px')}; /* Adjust margin based on sidebar state */
  transition: margin-left 0.3s ease;
`;

export const TopContent = styled.div`
  display: flex;
  gap: 20px;
  flex: 1; /* Take remaining space */
`;

export const BottomContent = styled.div`
  //margin-top: 10px;
  display: flex; /* Make the content side by side */
  gap: 10px; /* Add gap between the components */
`;

export const Section = styled.section`
  margin-bottom: 20px;
  flex: 1; /* Make the sections expand to fill the available space */
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  color: #333333; /* Darker text color */
`;

export const CardContainer = styled.div`
  display: flex;
  gap: 20px;
`;

export const Card = styled.div`
  background-color:rgb(29, 70, 111);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
  flex: 1;
  max-width: 250px;
  &:hover {
    transform: translateY(-5px);
  }
`;

export const CardTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
  color:rgb(255, 255, 255); 
`;

export const CardContent = styled.p`
  font-size: 16px;
  color:rgb(255, 255, 255);
`;

export const StudentDashboardContainer = styled.div`
  display: flex;
  padding-left: 240px;
`;


export const TeacherDashboardContainer = styled.div`
  display: flex;
  padding-left: 240px;
`;

