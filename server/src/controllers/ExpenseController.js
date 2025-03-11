const ExpenseModel = require("../models/ExpenseModel");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cloudinaryUtil = require("../utils/CloudinaryUtil");

const storage = multer.memoryStorage({
});

const upload = multer({ storage }).single("receipt");

const uploadExpensewithFile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      const cloudinaryresponse = await cloudinaryUtil.uploadFiletoCloudinary(
        req.file.buffer,
        req.file.originalname
      );

      console.log("cloudinaryresponse", cloudinaryresponse.secure_url);
      res.json({ data: cloudinaryresponse });
    }
  });
};

// Create Expense
const createExpense = async (req, res) => {
  try {
    // Create new expense
    const newExpense = new ExpenseModel({
      ...req.body,
    });

    await newExpense.save();
    res
      .status(201)
      .json({ message: "Expense added successfully", expense: newExpense });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getExpense = async (req, res) => {
  const response = await ExpenseModel.find();
  res.status(200).json({ data: response });
};
// Export Controller & Upload Middleware
module.exports = { createExpense, upload, getExpense, uploadExpensewithFile };
