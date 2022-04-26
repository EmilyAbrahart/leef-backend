const asyncHandler = require('express-async-handler');

const getPlants =  asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Get Plants",
  });
});

const addPlant = asyncHandler(async (req, res) => {
  if (
    !req.body.plant_name ||
    !req.body.plant_type ||
    !req.body.plant_schedule
  ) {
    res.status(400);
    throw new Error("Please include all required data");
  }
  res.status(200).json({
    message: "Create Plant",
  });
});

const updatePlant = asyncHandler(async (req, res) => {
  if (
    !req.body.plant_name ||
    !req.body.plant_type ||
    !req.body.plant_schedule
  ) {
    res.status(400);
    throw new Error("Please include all required data");
  }
  res.status(200).json({
    message: `Update Plant ${req.params.id}`,
  });
});

const deletePlant = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Delete plant ${req.params.id}`,
  });
});

module.exports = {
  getPlants,
  addPlant,
  updatePlant,
  deletePlant,
};
