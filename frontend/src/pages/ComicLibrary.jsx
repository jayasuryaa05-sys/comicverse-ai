import { useEffect, useState } from "react";
import { getComics } from "../services/api";

function ComicLibrary() {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadComics = async () => {
      try {
        const data = await getComics();
        setComics(data);
      } catch (error) {
        setMessage(error.message || "Failed to load comics.");
      } finally {
        setLoading(false);
      }
    };

    loadComics();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "80vh",
          background: "#111827",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>Loading comics...</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "80vh",
        background: "#111827",
        color: "white",
        padding: "40px",
      }}
    >
      <h1
        style={{
          color: "#6CFF4D",
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        Comic Library
      </h1>

      {message && (
        <p style={{ color: "#ff6b6b", textAlign: "center" }}>
          {message}
        </p>
      )}

      {comics.length === 0 ? (
        <p style={{ textAlign: "center", color: "#d1d5db" }}>
          No comics uploaded yet.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "25px",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {comics.map((comic) => (
            <div
              key={comic.id}
              style={{
                background: "#1f2937",
                padding: "25px",
                borderRadius: "15px",
              }}
            >
              <h2 style={{ color: "#6CFF4D" }}>
                {comic.title}
              </h2>

              <p>
                📄 {comic.filename}
              </p>

              <p>
                👤 {comic.username}
              </p>

              <p style={{ color: "#9ca3af" }}>
                📅{" "}
                {new Date(comic.uploaded_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ComicLibrary;