var express = require("express");
var router = express.Router();

var monk = require("monk");
// const { response } = require("../app");
var db = monk("localhost:27017/geekHunt");
var collection = db.get("tutors");

//base URL : /tutors
/* GET home page. */
router.get("/", function (req, res) {
  collection.find({}, function (err, tutors) {
    if (err) throw err;
    res.json(tutors);
  });
  //   res.render("index", { title: "Express" });
});

router.get("/:id", function (req, res) {
  collection.find({ _id: req.params.id }, function (err, videos) {
    if (err) throw err;
    res.json(videos);
  });
});

router.post("/", function (req, res) {
  collection.insert(
    {
      slug: req.body.slug,
      name: req.body.name,
      badge: req.body.badge,
      location: req.body.badge,
      info: req.body.badge,
      video: req.body.video,
      avatar: req.body.avatar,
      about: req.body.about,
      languages: req.body.languages,
      chats: req.body.languages,
      personalInfo: req.body.personalInfo,
      education: req.body.education,
      certification: req.body.certification,
      teachingStyle: req.body.teachingStyle,
      workEx: req.body.workEx,
    },
    function (err, videos) {
      if (err) throw err;
      res.json(videos);
    }
  );
});

router.put("/:id", function (req, res) {
  collection.update(
    { _id: req.params.id },
    {
      $set: {
        slug: req.body.slug,
        name: req.body.name,
        badge: req.body.badge,
        location: req.body.badge,
        info: req.body.badge,
        video: req.body.video,
        avatar: req.body.avatar,
        about: req.body.about,
        languages: req.body.languages,
        chats: req.body.languages,
        personalInfo: req.body.personalInfo,
        education: req.body.education,
        certification: req.body.certification,
        teachingStyle: req.body.teachingStyle,
        workEx: req.body.workEx,
      },
    },
    function (err, videos) {
      if (err) throw err;
      res.json(videos);
    }
  );
});

router.delete("/:id", function (req, res) {
  collection.remove({ _id: req.params.id }, function (err, tutors) {
    if (err) throw err;
    res.json(tutors);
  });
});

module.exports = router;
