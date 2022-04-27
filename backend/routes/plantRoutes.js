const express = require("express");
const router = express.Router();
const {
  getPlants,
  addPlant,
  updatePlant,
  waterPlant,
  deletePlant,
} = require("../controllers/plantControllers");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getPlants);

router.post("/", protect, addPlant);

router.put("/:id", protect, updatePlant);

router.put("/water/:id", protect, waterPlant);

router.delete("/:id", protect, deletePlant);

module.exports = router;
