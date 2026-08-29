import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComicById } from "../services/api";

function ComicDetails() {
  const { id } = useParams();

  const [comic, setComic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadComic = async () => {
      try {
        const data = await getComicById(id);
        setComic(data);
      } catch (error) {
        setMessage(error.message || "Failed to load comic.");
      } finally {
        setLoading(false);
      }
    };

    loadComic();
  }, [id]);

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
        <h2>Loading comic...</h2>
      </div>
    );
  }

  if (message) {
    return (
      <div
        style={{
          minHeight: "80vh",
          background: "#111827",
          color: "#ff6b6b",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>{message}</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "80vh",
        background: "#111827",
        color: "white",
        padding: "50px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "#1f2937",
          padding: "40px",
          borderRadius: "15px",
        }}
      >
        <h1
          style={{
            color: "#6CFF4D",
            marginBottom: "25px",
          }}
        >
          {comic.title}
        </h1>

        <p>
          📄 <strong>Filename:</strong> {comic.filename}
        </p>

        <p>
          👤 <strong>Uploaded by:</strong> {comic.username}
        </p>

        <p>
          📅 <strong>Uploaded:</strong>{" "}
          {new Date(comic.uploaded_at).toLocaleString()}
        </p>

        <p>
          🆔 <strong>Comic ID:</strong> {comic.id}
        </p>
      </div>
    </div>
  );
}

export default ComicDetails;