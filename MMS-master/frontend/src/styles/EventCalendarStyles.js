// EventCalendarStyles.js
import styled from 'styled-components';

export const EventCalendarContainer = styled.div`
  display: flex;
  padding-left: 260px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding-left: 0;
`;

export const Content = styled.div`
  flex: 1;
  padding: 0px;
  @media (max-width: 768px) {
  padding-left: 255px;
}
`;

export const CalendarContainer = styled.div`
  margin-top: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;

  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const Events = styled.div`
  margin-top: 20px;
`;

export const Event = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  background-color:rgb(255, 255, 255);
  border-radius: 5px;
  &:hover {
  background-color:rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  }
`;

export const AddEventForm = styled.form`
  margin-top: 20px;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
  flex-direction: column;
  align-items: stretch;
 }
`;

export const EventInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
`;

export const AddEventButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export const ErrorText = styled.p`
  color: red;
  margin-top: 10px;
`;
