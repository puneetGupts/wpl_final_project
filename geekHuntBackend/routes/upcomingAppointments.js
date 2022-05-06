var express = require("express");
var router = express.Router();

var monk = require("monk");
var db = monk("localhost:27017/geekHunt");
console.log("database" + db);
var collection = db.get("appointments");

//date: { $gt: '2022-04-24' }
//,{sort: {date:-1}}
router.get("/", function (req, res) {
  const d = new Date();
  console.log(d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate());
  collection.find(
    // {},
    { date: { $gte: req.query.day }, studentId: req.query.studentId },
    { limit: 5 },
    function (err, appointments) {
      if (err) throw err;
      res.json(appointments);
    }
  );
});

module.exports = router;
