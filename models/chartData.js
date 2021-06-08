const mongoose = require("mongoose");

const ChartSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide title"],
  },
  price: {
    type: String,
    required: [true, "Please add a price"]
  }
});

const ChartData = mongoose.model("charts", ChartSchema);

module.exports = ChartData;
