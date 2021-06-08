const express = require("express");
const router = express.Router();
const { getChartDataRoute , addChartDataRoute} = require("../controllers/chartData");
const { protect } = require("../middleware/auth");

router.route("/").get(protect, getChartDataRoute);

router.route("/").post(protect, addChartDataRoute);

module.exports = router;
