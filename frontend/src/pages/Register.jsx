import "./../styles/Auth.css";

function Register() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Create Account</h1>

        <input type="text" placeholder="Username" />

        <input type="email" placeholder="Email" />

        <input type="password" placeholder="Password" />

        <button>Register</button>
      </div>
    </div>
  );
}

export default Register;