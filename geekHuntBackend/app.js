var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var tutorsRouter = require("./routes/tutors");
var appointmentsRouter = require("./routes/appointments");
var reviews = require("./routes/reviews");
var upAppRouter = require("./routes/upcomingAppointments");

var favouritesRouter = require("./routes/favourites");
var upAppRouter = require("./routes/upcomingAppointments");
var tutorAppRouter = require("./routes/tutorUpcomingAppointments");
var totalHoursAppROuter = require("./routes/calculateTotalHours");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/tutors", tutorsRouter);
app.use("/appointments", appointmentsRouter);
app.use("/upcomingAppointments", upAppRouter);
app.use("/tutorUpcomingAppointments", tutorAppRouter);
app.use("/calculateTotalHours", totalHoursAppROuter);
app.use("/favourites", favouritesRouter);
app.use("/reviews", reviews);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
