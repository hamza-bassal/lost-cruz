// app/auth/signup.js
import { useState } from 'react';
import useSignUpWithEmailAndPassword from '../hooks/useSignUpWithEmailAndPassword'
import { Button } from '@mui/material';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const {loading, error, signup} = useSignUpWithEmailAndPassword();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here, such as an API call
    console.log(inputs); // Logs email and password to the console
  };

  return <>
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: 'inherit', gap: '10px' }}>
      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={inputs.email}
        onChange={handleChange}
        required
        style={{
          height: '30px',
          padding: '5px',
          width: 'inherit'
        }}
      />
      <label>Username:</label>
      <input
        type="text"
        name="username"
        value={inputs.username}
        onChange={handleChange}
        required
        style={{
          height: '30px',
          padding: '5px',
          width: 'inherit'
        }}
      />
      <label>Full Name:</label>
      <input
        type="text"
        name="fullName"
        value={inputs.fullName}
        onChange={handleChange}
        required
        style={{
          height: '30px',
          padding: '5px',
          width: 'inherit'
        }}
      />
      <label>Password:</label>
      <input
        type="password"
        name="password"
        value={inputs.password}
        onChange={handleChange}
        required
        style={{
          height: '30px',
          padding: '5px',
          width: 'inherit'
        }}
      />
      <label>Confirm Password:</label>
      <input
        type="password"
        name="confirmPassword"
        value={inputs.confirmPassword}
        onChange={handleChange}
        required
        style={{
          height: '30px',
          padding: '5px',
          width: 'inherit'
        }}
      />

        {error && (
          <p style={{ color: 'red', marginTop: '10px' }}>
            {error.message}
          </p>
        )}


      <Button 
        variant='contained'
        sx={{margin: "30px 0px 10px 0px", width: 'inherit'}}    
      type="submit" onClick={() => signup(inputs)}>Sign up</Button>
    </form>
  </>
  }

export default Signup;