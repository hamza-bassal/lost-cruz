// app/auth/login.js
import {useState} from 'react';

const Login = () => {

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

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
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '10px' }}>
      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={inputs.email}
        onChange={handleChange}
        required
      />
      <label>Password:</label>
      <input
        type="password"
        name="password"
        value={inputs.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Log in</button>
    </form>
  </>
  }
  
  export default Login;