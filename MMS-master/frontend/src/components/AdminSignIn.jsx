import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import AdminSignIn from './AdminSignIn'; // Import AdminSignIn directly
import { AdminSignInContainer, FormContainer, InputField, SubmitButton } from '../styles/AdminSignInStyles';
import axios from 'axios';

const AdminSignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    // const email = "swadhasri@gmail.com";
    // const password = "swagger123";

    try {
      const response = await fetch("http://localhost:4000/api/v1/users/admin/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
  
    const data = await response.json();
    console.log("Login Response:", data);

    if (data.success) {
      localStorage.setItem("admin", JSON.stringify(data.admin));
      navigate("/admin/dashboard"); // Redirect to dashboard page

    } else {
      alert(data.message || "Unauthorized access");
    } 
  }catch (error) {
      alert("Login failed, please try again.");
    }
  };

  return (
    <AdminSignInContainer>
      <h2>Admin Sign In</h2>
      <FormContainer>
        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* <SubmitButton to="../Admin/Dashboard" onClick={handleSignIn}>Sign In</SubmitButton> */}
        <SubmitButton onClick={handleSignIn}>Sign In</SubmitButton>
      </FormContainer>
    </AdminSignInContainer>
  );
};

export default AdminSignIn;
