const API_URL = "http://localhost:5000"; // Flask backend

// Chat with AI
export async function sendMessage(message) {
  const res = await fetch(`${API_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  return res.json();
}

// Upload & verify planting photo
export async function verifyPlanting(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/api/verify-planting`, {
    method: "POST",
    body: formData,
  });
  return res.json();
}
