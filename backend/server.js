const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const cors = require("cors");
const connectDB = require("./config/connectDB");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const uploadRoutes = require("./routes/uploadRoutes");
const path = require("path");

// cors
// credentials are set to true to send cookies from the backend
app.use(
  cors({
    origin: "http://localhost:5000", // Your frontend URL
    credentials: true,
  })
);

// database
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/category", require("./routes/categoryRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/upload", uploadRoutes);

// middleware
app.use(errorHandler);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// server
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`);
});
