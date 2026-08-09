function Profile() {
  const storedUser = localStorage.getItem("user");

  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user) {
    return (
      <div
        style={{
          minHeight: "calc(100vh - 80px)",
          background: "#111827",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>Please login to view your profile.</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "calc(100vh - 80px)",
        background: "#111827",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          width: "420px",
          background: "#1f2937",
          padding: "40px",
          borderRadius: "16px",
          border: "1px solid #374151",
          boxShadow: "0 15px 40px rgba(0,0,0,0.4)",
        }}
      >
        <h1
          style={{
            color: "#6CFF4D",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          My Profile
        </h1>

        <div style={{ marginBottom: "20px" }}>
          <p style={{ color: "#9ca3af", marginBottom: "5px" }}>
            Username
          </p>

          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
            {user.username}
          </p>
        </div>

        <div>
          <p style={{ color: "#9ca3af", marginBottom: "5px" }}>
            Email
          </p>

          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
            {user.email}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;