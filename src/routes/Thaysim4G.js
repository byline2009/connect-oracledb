const express = require("express");
const router = express.Router();
const thaySim4GController = require("../app/controllers/ThaySim4GControllers");
router.use("/", thaySim4GController.index);
router.use("/:slug", thaySim4GController.show);

module.exports = router;
