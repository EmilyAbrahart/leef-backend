const asyncHandler = require("express-async-handler");
const Plant = require("../models/plantModel");
const User = require("../models/userModel");

const getPlants = asyncHandler(async (req, res) => {
  const plants = await Plant.find({ user: req.user.id });

  res.status(200).json(plants);
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

  const plant = await Plant.create({
    plant_name: req.body.plant_name,
    plant_type: req.body.plant_type,
    plant_schedule: req.body.plant_schedule,
    user: req.user.id,
  });

  res.status(200).json(plant);
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
  const plant = await Plant.findById(req.params.id);
  if (!plant) {
    res.status(400);
    throw new Error("Plant not found.");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  // Check that the authenticated user matches the owner of the plant
  if (plant.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User Not Authorised");
  }

  const updatedPlant = await Plant.findByIdAndUpdate(
    req.params.id,
    {
      plant_name: req.body.plant_name,
      plant_type: req.body.plant_type,
      plant_schedule: req.body.plant_schedule,
    },
    { new: true }
  );

  res.status(200).json(updatedPlant);
});

const waterPlant = asyncHandler(async (req, res) => {
  if (
    !req.body.plant_name ||
    !req.body.plant_type ||
    !req.body.plant_schedule
  ) {
    res.status(400);
    throw new Error("Please include all required data");
  }
  const plant = await Plant.findById(req.params.id);
  if (!plant) {
    res.status(400);
    throw new Error("Plant not found.");
  }

  const wateredPlant = await Plant.findByIdAndUpdate(
    req.params.id,
    {
      plant_name: req.body.plant_name,
      plant_type: req.body.plant_type,
      plant_schedule: req.body.plant_schedule,
      last_watered: new Date(),
    },
    { new: true }
  );

  res.status(200).json(wateredPlant);
});

const deletePlant = asyncHandler(async (req, res) => {
  const plant = await Plant.findById(req.params.id);
  if (!plant) {
    res.status(400);
    throw new Error("Plant not found.");
  }
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  // Check that the authenticated user matches the owner of the plant
  if (plant.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User Not Authorised");
  }
  await plant.remove();

  res.status(200).json({
    id: req.params.id,
  });
});

module.exports = {
  getPlants,
  addPlant,
  updatePlant,
  waterPlant,
  deletePlant,
};
