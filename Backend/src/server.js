import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server aktif di http://localhost:${PORT}`);
});
