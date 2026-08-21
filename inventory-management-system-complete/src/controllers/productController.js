const mongoose = require("mongoose");
const Product = require("../models/Product");
const Transaction = require("../models/Transaction");
const {
  isNonEmptyString,
  isPositiveNumber,
  isNonNegativeInteger,
  isPositiveInteger
} = require("../utils/validation");

function createError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function parseProductId(productId) {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw createError(400, "Invalid product ID");
  }
  return productId;
}

async function createProduct(req, res, next) {
  try {
    const { productName, price, availableStock } = req.body;

    if (!isNonEmptyString(productName)) {
      throw createError(400, "Product name is required");
    }

    if (!isPositiveNumber(price)) {
      throw createError(400, "Product price must be greater than zero");
    }

    if (!isNonNegativeInteger(availableStock)) {
      throw createError(
        400,
        "Product stock must be a non-negative integer"
      );
    }

    const product = await Product.create({
      productName: productName.trim(),
      price,
      availableStock
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product
    });
  } catch (error) {
    next(error);
  }
}

async function getProducts(req, res, next) {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
}

async function purchaseProduct(req, res, next) {
  try {
    const { productId, quantity } = req.body;
    parseProductId(productId);

    if (!isPositiveInteger(quantity)) {
      throw createError(
        400,
        "Purchase quantity must be a positive integer"
      );
    }

    // Conditional update prevents stock from going below zero
    // even if two purchase requests arrive close together.
    const product = await Product.findOneAndUpdate(
      {
        _id: productId,
        availableStock: { $gte: quantity }
      },
      {
        $inc: { availableStock: -quantity }
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!product) {
      const exists = await Product.exists({ _id: productId });

      if (!exists) {
        throw createError(404, "Product not found");
      }

      throw createError(
        400,
        "Purchase quantity exceeds available stock"
      );
    }

    const transaction = await Transaction.create({
      productId: product._id,
      transactionType: "Purchase",
      quantity
    });

    return res.status(200).json({
      success: true,
      message: "Purchase completed successfully",
      data: {
        product,
        transaction
      }
    });
  } catch (error) {
    next(error);
  }
}

async function restockProduct(req, res, next) {
  try {
    const { productId, quantity } = req.body;
    parseProductId(productId);

    if (!isPositiveInteger(quantity)) {
      throw createError(
        400,
        "Restock quantity must be a positive integer"
      );
    }

    const product = await Product.findByIdAndUpdate(
      productId,
      {
        $inc: { availableStock: quantity }
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!product) {
      throw createError(404, "Product not found");
    }

    const transaction = await Transaction.create({
      productId: product._id,
      transactionType: "Restock",
      quantity
    });

    return res.status(200).json({
      success: true,
      message: "Product restocked successfully",
      data: {
        product,
        transaction
      }
    });
  } catch (error) {
    next(error);
  }
}

async function getProductHistory(req, res, next) {
  try {
    const { productId } = req.params;
    parseProductId(productId);

    const product = await Product.findById(productId).select(
      "_id productName price availableStock"
    );

    if (!product) {
      throw createError(404, "Product not found");
    }

    const transactions = await Transaction.find({ productId })
      .sort({ transactionDateTime: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      data: {
        product,
        transactions
      }
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createProduct,
  getProducts,
  purchaseProduct,
  restockProduct,
  getProductHistory
};
