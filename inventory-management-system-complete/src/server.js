const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config");

async function startServer() {
  try {
    await mongoose.connect(config.mongoUri);

    console.log("MongoDB connected");

    app.listen(config.port, () => {
      console.log(
        `Server running at http://localhost:${config.port}`
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();
