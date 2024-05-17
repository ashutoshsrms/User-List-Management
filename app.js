const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./utils/errorHandler");
const listRoutes = require("./routes/listRoutes");
const userRoutes = require("./routes/userRoutes");
const emailRoutes = require("./routes/emailRoutes");
dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use("/api", listRoutes);
app.use("/api", userRoutes);
app.use("/api", emailRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
