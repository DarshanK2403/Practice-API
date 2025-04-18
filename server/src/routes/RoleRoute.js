const express = require("express");
const router = express.Router();
const RoleController = require("../controllers/RoleController");

router.get("/get-roles", RoleController.GetRoles);
router.post("/create-role", RoleController.CreateRole);

module.exports = router;