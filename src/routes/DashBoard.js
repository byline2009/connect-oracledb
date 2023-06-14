const express = require("express");
const router = express.Router();
const dashboardController = require("../app/controllers/DashboardControllers");
router.use("/", dashboardController.index);

module.exports = router;
