var express = require("express");
var router = express.Router();

var monk = require("monk");
// const { response } = require("../app");
var db = monk("localhost:27017/geekHunt");
var collection = db.get("appointments");

//base URL : /tutors
/* GET home page. */
router.get("/", function (req, res) {
  collection.find({}, function (err, appointments) {
    if (err) throw err;
    res.json(appointments);
  });
  //   res.render("index", { title: "Express" });
});

router.get("/:id", function (req, res) {
  collection.find({ _id: req.params.id }, function (err, appointments) {
    if (err) throw err;
    res.json(appointments);
  });
});

router.post("/", function (req, res) {
  collection.insert(
    {
      date: req.body.date,
      time: req.body.time,
      slotFrom: req.body.slotFrom,
      slotTo: req.body.slotTo,
      tutorId: req.body.tutorId,
      studentId: req.body.studentId,
      appointmentDuration: req.body.appointmentDuration,
    },
    function (err, appointments) {
      if (err) throw err;
      res.json(appointments);
    }
  );
});

router.put("/:id", function (req, res) {
  collection.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        date: req.body.date,
        time: req.body.time,
        slotFrom: req.body.slotFrom,
        slotTo: req.body.slotTo,
        tutorId: req.body.tutorId,
        studentId: req.body.studentId,
        appointmentDuration: req.body.appointmentDuration,
      },
    },
    function (err, appointments) {
      if (err) throw err;
      res.json(appointments);
    }
  );
});

router.delete("/:id", function (req, res) {
  collection.remove({ _id: req.params.id }, function (err, appointments) {
    if (err) throw err;
    res.json(appointments);
  });
});

module.exports = router;
