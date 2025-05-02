const express = require("express");
const axios = require("axios");
const app = express();

const FIREBASE_URL = "https://server-shield-d28ad-default-rtdb.asia-southeast1.firebasedatabase.app";
const FIREBASE_SECRET = "wRULCkZW4jRuzd8KWTlFYkfc5DeixJKUhLuK0PK4"; 

app.use(express.json());

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
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy Server Running on Port ${PORT}`));

