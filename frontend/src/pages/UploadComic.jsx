import { useState } from "react";
import { uploadComic } from "../services/api";

function UploadComic() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a comic file.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const result = await uploadComic(file, file.name);

      setMessage(result.message);
      setFile(null);
    } catch (error) {
      setMessage(error.message || "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        background: "#111827",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      <div
        style={{
          width: "450px",
          background: "#1f2937",
          padding: "40px",
          borderRadius: "15px",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#6CFF4D", marginBottom: "15px" }}>
          Upload Comic
        </h1>

        <p style={{ marginBottom: "25px", color: "#d1d5db" }}>
          Upload your comic or graphic novel.
        </p>

        <form onSubmit={handleUpload}>
          <input
            type="file"
            accept=".pdf,.cbz,.cbr,.png,.jpg,.jpeg"
            onChange={(e) => setFile(e.target.files[0])}
            style={{
              width: "100%",
              marginBottom: "20px",
              color: "white",
            }}
          />

          {file && (
            <p style={{ marginBottom: "20px" }}>
              Selected: {file.name}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              background: "#6CFF4D",
              color: "black",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            {loading ? "Uploading..." : "Upload Comic"}
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: "20px",
              color: "#6CFF4D",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default UploadComic;