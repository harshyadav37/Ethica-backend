const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./models/db");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use ("/api/user" ,require("./routes/CommonRoutes"))

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
