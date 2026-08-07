import { useEffect, useState } from "react";
import { getHomeData } from "../services/api";

function Home() {
  const [data, setData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    async function loadData() {
      const result = await getHomeData();
      setData(result);
    }

    loadData();
  }, []);

  return (
    <div
      style={{
        background: "#111827",
        color: "white",
        minHeight: "80vh",
        textAlign: "center",
        paddingTop: "100px",
      }}
    >
      <h1
        style={{
          color: "#39ff14",
          fontSize: "60px",
        }}
      >
        {data.title}
      </h1>

      <p
        style={{
          fontSize: "24px",
        }}
      >
        {data.description}
      </p>
    </div>
  );
}

export default Home;