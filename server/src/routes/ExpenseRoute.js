const express = require("express");
const ExpenseController = require("../controllers/ExpenseController");

const router = express.Router();

// Route for creating an expense (with file upload)
router.post("/add-expense", ExpenseController.upload, ExpenseController.createExpense);
router.get("/get-expense", ExpenseController.getExpense);
router.post("/upload", ExpenseController.uploadExpensewithFile);


module.exports = router;
