const API_URL = "http://127.0.0.1:8000";

// ===============================
// REGISTER USER
// ===============================
export async function registerUser(userData) {
  const response = await fetch(`${API_URL}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Registration failed");
  }

  return data;
}

// ===============================
// LOGIN USER
// ===============================
export async function loginUser(userData) {
  const response = await fetch(`${API_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Login failed");
  }

  return data;
}

// ===============================
// HOME DATA
// ===============================
export async function getHomeData() {
  const response = await fetch(`${API_URL}/`);

  if (!response.ok) {
    throw new Error("Failed to fetch home data");
  }

  return response.json();
}
// ===============================
// UPLOAD COMIC
// ===============================
export async function uploadComic(file, title) {
  const token = JSON.parse(localStorage.getItem("user"))?.access_token;

  if (!token) {
    throw new Error("Please login first.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("title", title);

  const response = await fetch(`${API_URL}/api/comics/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Comic upload failed");
  }

  return data;
}

export async function getComics() {
  const token = JSON.parse(localStorage.getItem("user"))?.access_token;

  if (!token) {
    throw new Error("Please login first.");
  }

  const response = await fetch(`${API_URL}/api/comics`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to fetch comics");
  }

  return data;
}