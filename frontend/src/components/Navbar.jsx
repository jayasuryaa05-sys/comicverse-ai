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
      <h2 style={{ color: "#6CFF4D" }}>ComicVerse AI</h2>

      <div
        style={{
          display: "flex",
          gap: "25px",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{ color: "white", textDecoration: "none" }}
        >
          Home
        </Link>

        <Link
          to="/explore"
          style={{ color: "white", textDecoration: "none" }}
        >
          Explore
        </Link>

        <Link
          to="/profile"
          style={{ color: "white", textDecoration: "none" }}
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
      </div>
    </nav>
  );
}

export default Navbar;