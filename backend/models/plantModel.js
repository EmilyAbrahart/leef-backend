const mongoose = require("mongoose");

const plantSchema = mongoose.Schema(
  {
    plant_name: {
      type: String,
      required: [true, "Please add a plant name"],
    },
    plant_type: {
      type: String,
      required: [true, "Please add a plant type"],
    },
    plant_schedule: {
      type: Number,
      min: 1,
      required: [
        true,
        "Please add the desired number of days between watering for your plant",
      ],
    },
    last_watered: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Plant", plantSchema);
