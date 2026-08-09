import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 50px",
        background: "#111827",
      }}
    >
      {/* Logo */}
      <h2 style={{ color: "#6CFF4D", margin: 0 }}>
        ComicVerse AI
      </h2>

      {/* Navigation */}
      <div
        style={{
          display: "flex",
          gap: "25px",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Home
        </Link>

        <Link
          to="/explore"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Explore
        </Link>

        <Link
          to="/upload"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Upload
        </Link>

        <Link
          to="/profile"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Profile
        </Link>

        <Link
          to="/login"
          style={{
            background: "#6CFF4D",
            color: "black",
            padding: "10px 20px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Login
        </Link>

        <Link
          to="/register"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;