const express = require("express");
const cors = require("cors");
const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");

// const connectDB = require("./config/db");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/books", bookRoutes);
// app.use("/api/auth",authRoutes)

// app.use("/api/auth",authRoutes)
// connectDB()

app.get("/", (req, res) => {
  res.send("Hell World!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
