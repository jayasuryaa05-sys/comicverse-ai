import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function ComicReader() {
  const { id } = useParams();
  const [pdfUrl, setPdfUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadComic = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = user?.access_token;

        if (!token) {
          setError("Please login first.");
          return;
        }

        const response = await fetch(
          `http://127.0.0.1:8000/api/comics/${id}/file`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to load comic.");
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        setPdfUrl(url);
      } catch (error) {
        setError(error.message);
      }
    };

    loadComic();
  }, [id]);

  if (error) {
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
        <h2 style={{ color: "#ff6b6b" }}>{error}</h2>

        <Link
          to="/explore"
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            background: "#6CFF4D",
            color: "black",
            textDecoration: "none",
            borderRadius: "8px",
            fontWeight: "bold",
          }}
        >
          Back to Explore
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "80vh",
        background: "#111827",
        color: "white",
        padding: "25px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#6CFF4D",
          marginBottom: "20px",
        }}
      >
        Comic Reader
      </h1>

      {!pdfUrl ? (
        <p style={{ textAlign: "center" }}>
          Loading comic...
        </p>
      ) : (
        <iframe
          src={pdfUrl}
          title="Comic Reader"
          style={{
            width: "100%",
            height: "75vh",
            border: "none",
            borderRadius: "10px",
            background: "white",
          }}
        />
      )}

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Link
          to="/explore"
          style={{
            padding: "10px 20px",
            background: "#374151",
            color: "white",
            textDecoration: "none",
            borderRadius: "8px",
          }}
        >
          ← Back to Explore
        </Link>
      </div>
    </div>
  );
}

export default ComicReader;