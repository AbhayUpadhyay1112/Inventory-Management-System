const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true
    },
    transactionType: {
      type: String,
      enum: ["Purchase", "Restock"],
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Transaction quantity must be greater than zero"],
      validate: {
        validator: Number.isInteger,
        message: "Transaction quantity must be an integer"
      }
    },
    transactionDateTime: {
      type: Date,
      default: Date.now
    }
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);
