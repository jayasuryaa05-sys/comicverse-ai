const API_URL = "http://127.0.0.1:8000";

export async function getHomeData() {
  const response = await fetch(`${API_URL}/api/home`);
  return response.json();
}