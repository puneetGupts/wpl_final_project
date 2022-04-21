var express = require("express");
var router = express.Router();

// var monk = require("monk");
// var db = monk("localhost:27017/tutorsTable");
// var collection = db.get("tutors");

/* GET home page. */
router.get("/", function (req, res) {
  // collection.find({}, function (err, tutors) {
  //   if (err) throw err;
  //   res.json(tutors);
  // });
  res.render("index", { title: "Express" });
});

module.exports = router;
