var express = require("express");
var router = express.Router();

const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const bcrypt = require("bcryptjs");
// const asyncHandler = require("express-async-handler");

var monk = require("monk");
var db = monk("localhost:27017/geekHunt");
var collection = db.get("users");

/* GET home page. */
router.get("/", function (req, res) {
  res.render("index", { title: "Express" });
});

// protected route
router.get("/welcome", auth, function (req, res) {
  res.json({ auth: "true" });
});

router.post("/register", function (req, res) {
  let { username, email, password, pic, isTutor } = req.body;
  if (!(username && email && password && pic && !isTutor)) {
    res.status(400).send({ msg: "All fields are required!" });
  } else {
    collection.findOne({ email: email }, function (err, user) {
      if (err)
        res.status(400).send({ msg: "User already exists. Please login!" });

      if (user) {
        res.status(400).send({ msg: "User already exists. Please login!" });
        // res.json({ error: "User already exists. Please login!" });
      } else {
        const salt = bcrypt.genSaltSync(10);
        password = bcrypt.hashSync(password, salt);

        let newUser = {
          username,
          email,
          password,
          pic,
          isTutor,
        };
        collection.insert(newUser, function (err, user) {
          if (err) {
            res.status(400);
            throw new Error("Error occured!");
          }
          var token = jwt.sign({ user_id: user._id, email }, "secretkey");

          if (token) {
            user.token = token;
          }
          res.status(201).json(user);
        });
      }
    });
  }
});

router.put("/update/:id", function (req, res) {
  let { username, email, password, pic, isTutor } = req.body;
  collection.update(
    { _id: req.params.id },
    {
      $set: {
        username: username,
        email: email,
        password: password,
        pic: pic,
        isTutor: isTutor,
      },
    },
    function (err, videos) {
      if (err) throw err;
      res.json(videos);
    }
  );
});

router.post("/login", function (req, res) {
  let { email, password } = req.body;
  if (!(email && password)) {
    res.status(400).send({ msg: "All fields are required!" });
  } else {
    collection.findOne({ email: email }, function (err, user) {
      if (err) throw err;
      if (user == null) {
        res.status(400).send({ msg: "User does not exist" });
      } else {
        // console.log(password);
        bcrypt.compare(password, user.password, (error, data) => {
          if (error) {
            throw err;
          } else {
            if (data) {
              var token = jwt.sign({ user_id: user._id, email }, "secretkey");
              user.token = token;
              return res.status(200).json(user);
            } else {
              return res.status(400).json({ msg: "Invalid credential!!" });
            }
          }
        });
      }
    });
  }
});

module.exports = router;
