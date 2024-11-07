// app/auth/login.js
import { useState } from "react";
import useLogin from "../hooks/useLogin";
import { Button } from "@mui/material";

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
  const { loading, error, login } = useLogin();
  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "inherit",
          gap: "10px",
        }}
      >
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={inputs.email}
          onChange={handleChange}
          required
          style={{
            height: "30px",
            padding: "5px",
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
            height: "30px",
            padding: "5px",
          }}
        />
        {error && (
          <p style={{ color: "red", marginTop: "10px" }}>{error.message}</p>
        )}
        <Button
          variant="contained"
          type="submit"
          sx={{ margin: "30px 0px 10px 0px" }}
          onClick={() => login(inputs)}
        >
          Log in
        </Button>
      </form>
    </>
  );
};

export default Login;
