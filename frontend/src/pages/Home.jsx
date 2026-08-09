import { useEffect, useState } from "react";
import { getHomeData } from "../services/api";

function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadHomeData() {
      try {
        const result = await getHomeData();
        setData(result);
      } catch (error) {
        setError("Unable to connect to ComicVerse AI backend.");
      }
    }

    loadHomeData();
  }, []);

  if (error) {
    return (
      <div
        style={{
          minHeight: "80vh",
          background: "#111827",
          color: "red",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20px",
        }}
      >
        {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div
        style={{
          minHeight: "80vh",
          background: "#111827",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20px",
        }}
      >
        Loading...
      </div>
    );
  }

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
        textAlign: "center",
        padding: "40px",
      }}
    >
      <h1
        style={{
          color: "#6CFF4D",
          fontSize: "50px",
          marginBottom: "20px",
        }}
      >
        Welcome to ComicVerse AI
      </h1>

      <p
        style={{
          fontSize: "22px",
          marginBottom: "15px",
        }}
      >
        {data.message}
      </p>

      <p
        style={{
          color: "#6CFF4D",
          fontSize: "18px",
        }}
      >
        AI-powered comic experience 🚀
      </p>
    </div>
  );
}

export default Home;