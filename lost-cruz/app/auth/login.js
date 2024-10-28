// app/auth/login.js
export default function Login() {
    return (
      <form>
        <label>Email:</label>
        <input type="email" required />
        <label>Password:</label>
        <input type="password" required />
        <button type="submit">Login</button>
      </form>
    );
  }
  