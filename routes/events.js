import express from 'express';
var router = express.Router()

/* GET home page. */
router.post("/events", function(req, res, next) {
  res.render("index", { title: "Express" })
})

export default router;
