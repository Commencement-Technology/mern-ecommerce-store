const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const cors = require("cors");
const connectDB = require("./config/connectDB");
const errorHandler = require("./middleware/errorHandler");

// cors
app.use(cors());

// database
connectDB();

app.use(express.json());

// routes
app.use("/api/users", require("./routes/userRoutes"));

// middleware
app.use(errorHandler);

// server
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`);
});
