const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const productRoutes = require("./routes/productRoutes");
const {
  notFoundHandler,
  errorHandler
} = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Inventory Management System API is running"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Inventory Management API is running"
  });
});

app.use("/products", productRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
