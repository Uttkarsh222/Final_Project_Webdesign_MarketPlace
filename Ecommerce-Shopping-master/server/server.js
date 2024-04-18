const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");  // Assuming this has the MongoDB connection logic
const PORT = process.env.PORT || 5001;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));


// MongoDB Connection Initialized - The connectDB from './config/db' is used here.
connectDB();

// Routes
app.use('/api/items', require("./routes/items"));
app.use('/api/payment', cors(), require("./routes/payment"));

// Starting the server
app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
