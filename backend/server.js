// server.js
const express = require("express");
const cors = require("cors");          // ✅ import cors
const routes = require("./routes");
require("dotenv").config();

const app = express();

// Enable CORS for all origins (or restrict to frontend)
app.use(cors());                       // ✅ enable CORS

app.use(express.json());

app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Xisekelo Safety backend running on port", PORT);
});
