require("dotenv").config(); // 🔥 Load environment variables

const express = require("express");
const axios = require("axios");
const app = express();

const FIREBASE_URL = process.env.FIREBASE_URL;
const FIREBASE_SECRET = process.env.FIREBASE_SECRET;
const PORT = process.env.PORT;

app.use(express.json());

// ✅ Health check route
app.get("/", (req, res) => {
  res.status(200).send("✅ Proxy Server is live and responding.");
});

// ✅ Data forwarding route
app.post("/send-data", async (req, res) => {
  try {
    const data = req.body;
    const timestamp = Date.now();

    const response = await axios.put(
      `${FIREBASE_URL}/testdata/${timestamp}.json?auth=${FIREBASE_SECRET}`,
      data
    );

    res.status(200).json({ success: true, firebaseResponse: response.data });
  } catch (error) {
    console.error("❌ Firebase Error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ✅ Handle missing PORT
if (!PORT) {
  console.error("❌ Railway PORT not defined. Exiting...");
  process.exit(1);
}

// ✅ Global error handler for unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("🔥 Unhandled Rejection:", err);
});

app.listen(PORT, () => {
  console.log(`🚀 Proxy Server Running on Port ${PORT}`);
});
