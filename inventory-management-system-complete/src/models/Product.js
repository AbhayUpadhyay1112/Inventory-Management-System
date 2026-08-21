const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Product name is required"],
      unique: true,
      trim: true,
      minlength: [1, "Product name cannot be empty"]
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0.01, "Product price must be greater than zero"]
    },
    availableStock: {
      type: Number,
      required: [true, "Available stock is required"],
      min: [0, "Product stock cannot be negative"],
      validate: {
        validator: Number.isInteger,
        message: "Available stock must be an integer"
      }
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model("Product", productSchema);
