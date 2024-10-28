// app/auth/signup.js
export default function Signup() {
    return (
      <form>
        <label>Email:</label>
        <input type="email" required />
        <label>Password:</label>
        <input type="password" required />
        <label>Confirm Password:</label>
        <input type="password" required />
        <button type="submit">Sign Up</button>
      </form>
    );
  }
  