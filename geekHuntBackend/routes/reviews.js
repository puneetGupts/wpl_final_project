var express = require("express");
var router = express.Router();

var monk = require("monk");
// const { response } = require("../app");
var db = monk("localhost:27017/geekHunt");
var collection = db.get("reviews");
var tutors = db.get("tutors");

//base URL : /reviews
router.get("/", function (req, res) {
  tutorId = req.query.tutorId;
  collection.find({ tutorId: tutorId }, { limit: 5 }, function (err, tutors) {
    if (err) throw err;
    res.json(tutors);
  });
});

router.post("/", function (req, res) {
  collection.insert(
    {
      rating: req.body.rating,
      comment: req.body.comment,
      name: req.body.name,
      tutorId: req.body.tutorId,
      studentId: req.body.studentId,
    },
    function (err, videos) {
      if (err) throw err;
      res.json(videos);
    }
  );
});

module.exports = router;
