import "./../styles/Auth.css";

function Login() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Login</h1>

        <input type="email" placeholder="Email" />

        <input type="password" placeholder="Password" />

        <button>Login</button>
      </div>
    </div>
  );
}

export default Login;