var express = require("express");
var router = express.Router();

var monk = require("monk");
var db = monk("localhost:27017/geekHunt");
console.log("database" + db);
var collection = db.get("appointments");

router.get("/", function (req, res) {
  console.log("Request Parameter  >> " + req.query.day);
  collection.find({ date: req.query.day }, function (err, appointments) {
    if (err) throw err;
    res.json(appointments);
  });
});

router.get("/:id", function (req, res) {
  console.log("Request Parameter  >> " + req.params.id);
  collection.find({ _id: req.params.id }, function (err, appointments) {
    if (err) throw err;
    res.json(appointments);
  });
});

router.post("/", function (req, res) {
  collection.insert(
    {
      title: req.body.title,
      slot: req.body.slot,
      date: req.body.date,
      tutorId: req.body.tutorId,
      studentId: req.body.studentId,
      studentName: req.body.studentName,
      tutorName: req.body.tutorName,
    },
    function (err, appointments) {
      if (err) throw err;
      res.json(appointments);
    }
  );
});

// router.put("/:id", function (req, res) {
//   collection.update(
//     { _id: req.params.id },
//     {
//       $set: {
//         detail: req.body.detail,
//         slot: req.body.slot,
//         tutor_id: req.body.tutor_id,
//         student_id: req.body.student_id,
//       },
//     },
//     function (err, appointments) {
//       if (err) throw err;
//       res.json(appointments);
//     }
//   );
// });

router.put("/:id", function (req, res) {
  collection.update(
    { _id: req.params.id },
    {
      $set: {
        detail: req.body.detail,
        slot: req.body.slot,
        tutor_id: req.body.tutor_id,
        student_id: req.body.student_id,
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
