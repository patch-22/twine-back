import express from "express"
import db from "../database"
var router = express.Router()

// Add an event.
// Please include the object attributes
// { count, timeAdded }
// where count is 1 or -1 and timeAdded is current time
router.post("/", function(req, res, next) {
  db.get("events")
    .push(req.body)
    .write()
  res.sendStatus(200)
})

// Send all raw events
router.get("/", function(req, res, next) {
  res.send(db.get("events").value())
})

// Send summary data for the UI
router.get("/summary", function(req, res, next) {
  let total = 0
  db.get("events")
    .value()
    .forEach(event => {
      total += event.count == 1 ? 1 : -1
    })
  res.send({
    current: total,
    insights: [
      "You're busier than usual.",
      "You're approaching your building's capacity.",
    ],
  })
})

export default router
