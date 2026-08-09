import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/Auth.css";
import { loginUser } from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const data = await loginUser({
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(data));

      setMessage("Login successful! Redirecting...");

      setTimeout(() => {
        navigate("/");
      }, 800);
    } catch (err) {
      setError(err.message || "Login failed.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>

        {message && (
          <p style={{ color: "#6CFF4D" }}>{message}</p>
        )}

        {error && (
          <p style={{ color: "#ff6b6b" }}>{error}</p>
        )}
      </div>
    </div>
  );
}

export default Login;