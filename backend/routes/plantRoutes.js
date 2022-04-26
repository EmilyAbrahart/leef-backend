const express = require("express");
const router = express.Router();
const { getPlants, addPlant, updatePlant, deletePlant } = require("../controllers/plantControllers");

router.get("/", getPlants);

router.post("/", addPlant);

router.put("/:id", updatePlant);

router.delete("/:id", deletePlant);

module.exports = router;
