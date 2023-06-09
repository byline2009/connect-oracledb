const express = require("express");
const router = express.Router();
const employeeOffController = require("../app/controllers/EmployeeOffControllers");
router.use("/:slug", employeeOffController.show);
router.use("/", employeeOffController.index);

module.exports = router;
