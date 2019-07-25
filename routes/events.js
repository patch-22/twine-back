import express from "express"
import db from "../database"
var router = express.Router()

// Add VagueData to the data lake.
router.post("/", function(req, res, next) {
  db.get("events").push(req.body)
  res.sendStatus(200)
})

// Fetch VagueData from the data lake and deliver to directly to the gears which need oiling.
router.get("/", function(req, res, next) {
  res.send(db.get("events").value())
  res.sendStatus(200)
})

export default router
