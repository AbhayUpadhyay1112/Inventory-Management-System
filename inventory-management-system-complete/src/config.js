require("dotenv").config();

const config = {
  port: Number(process.env.PORT) || 5000,
  mongoUri:
    process.env.MONGODB_URI ||
    "mongodb://127.0.0.1:27017/inventory_management"
};

module.exports = config;
