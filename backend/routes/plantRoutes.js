const express = require("express");
const router = express.Router();
const {
  getPlants,
  addPlant,
  updatePlant,
  waterPlant,
  deletePlant,
} = require("../controllers/plantControllers");

router.get("/", getPlants);

router.post("/", addPlant);

router.put("/:id", updatePlant);

router.put("/water/:id", waterPlant);

router.delete("/:id", deletePlant);

module.exports = router;
