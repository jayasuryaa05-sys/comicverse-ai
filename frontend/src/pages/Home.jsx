import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      style={{
        minHeight: "80vh",
        background: "#111827",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          color: "#6CFF4D",
          fontSize: "60px",
        }}
      >
        ComicVerse AI
      </h1>

      <p
        style={{
          marginTop: "20px",
          fontSize: "22px",
        }}
      >
        Welcome to the AI Powered Comic Reading Platform
      </p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "40px",
        }}
      >
        <Link to="/login">
          <button>Login</button>
        </Link>

        <Link to="/register">
          <button>Register</button>
        </Link>

        <Link to="/explore">
          <button>Explore Comics</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;