import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StudentSignInContainer } from '../styles/StudentSignInStyles';
import { FormContainer, InputField, SubmitButton } from '../styles/AdminSignInStyles';

export default function TeamLeaderLogin() {
  const [Ids, setIds] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const StudentLogin = useRef();

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!Ids || !password) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      StudentLogin.current.innerHTML = "Loading...";

      // Use GET with query parameters
      const response = await fetch(`http://localhost:4000/api/team/Teamlogin?Ids=${Ids}&password=${password}`
      );

      const data = await response.json();

      if (response.ok) {
        alert('Logged in successfully!');
    console.log(response)
        StudentLogin.current.innerHTML = "Sign In";
        navigate('/teams/team/'+Ids);  // Navigate to the team dashboard
      } else {
        StudentLogin.current.innerHTML = "Sign In";
        alert(data.error || 'Failed to log in');
      }

    } catch (error) {
      console.log('Error occurred: ' + error);
      StudentLogin.current.innerHTML = "Sign In";
    }
  };

  return (
    <StudentSignInContainer>
      <h2>Team Leader Sign In</h2>
      <FormContainer onSubmit={handleSignIn}>
        <InputField
          type="text"
          placeholder="Team ID"
          value={Ids}
          onChange={(e) => setIds(e.target.value)}
          required
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <SubmitButton as="button" ref={StudentLogin} type="submit">
          Sign In
        </SubmitButton>
      </FormContainer>
    </StudentSignInContainer>
  );
}
