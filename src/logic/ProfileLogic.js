// src/pages/profile/ProfileLogic.js

export const fetchUserProfile = async (userId) => {
  try {
    // 🧠 Ganti endpoint ini sesuai backend kamu nanti
    const response = await fetch(`https://api.novacafe.com/users/${userId}`);
    if (!response.ok) throw new Error("Gagal mengambil data user");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};
