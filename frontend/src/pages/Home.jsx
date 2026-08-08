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
      <div style={{ padding: "50px", color: "red" }}>
        {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ padding: "50px", color: "white" }}>
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
          fontSize: "60px",
          marginBottom: "20px",
        }}
      >
        {data.title}
      </h1>

      <p
        style={{
          fontSize: "24px",
          marginBottom: "15px",
        }}
      >
        {data.description}
      </p>

      <p
        style={{
          color: "#6CFF4D",
          fontSize: "18px",
        }}
      >
        {data.status}
      </p>
    </div>
  );
}

export default Home;