import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSignIn from './AdminSignIn'; // Import AdminSignIn directly
import { AdminRegisterContainer, FormContainer, InputField, SubmitButton } from '../styles/AdminRegisterStyles';
import axios from 'axios';

const AdminRegister = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phno, setPhno] = useState('');
  const [password, setPassword] = useState('');
  const [showSignIn, setShowSignIn] = useState(false); // State to control component rendering
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/v1/register/admin', { email, name, phno, password }, { headers: { "Content-Type": "application/json" } } );
      if (response.status === 200) {
        // Render the AdminSignIn component after successful registration
        setShowSignIn(true);
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  // Conditionally render AdminSignIn after successful registration
  if (showSignIn) return <AdminSignIn />;

  return (
    <AdminRegisterContainer>
      <h2>Admin Register</h2>
      <FormContainer onSubmit={handleRegister}>
        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputField
          type="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <InputField
          type="phno"
          placeholder="Phone Number"
          value={phno}
          onChange={(e) => setPhno(e.target.value)}
          required
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <SubmitButton type="submit">Register</SubmitButton>
      </FormContainer>
    </AdminRegisterContainer>
  );
};

export default AdminRegister;
