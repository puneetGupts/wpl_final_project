const express = require("express");

var createError = require("http-errors");
const cron = require("node-cron");
const nodemailer = require("nodemailer");
// var handlebars = require("handlebars");
const app = express();
var fs = require("fs");

var monk = require("monk");
var db = monk("localhost:27017/geekHunt");
var collection = db.get("users");
var appointments = db.get("appointments");

const getResults = async function () {
  return collection.find({});
};

const getAppointments = async function () {
  return appointments.find({});
};

const start = async function (a, b) {
  const results = await getResults();
  const appointmentResults = await getAppointments();
  var mailList = [];
  var appointmentArray = [];
  results.map((result) => {
    var mailListStructure = {};
    mailListStructure.name = result.username;

    mailListStructure.studentAppointment = appointmentResults
      .filter((obj) => obj.studentId == result._id)
      .map((obj) => ({ title: obj.title, slot: obj.slot, date: obj.date }));
    mailListStructure.email = result.email;
    appointmentArray.push(mailListStructure);
    mailList.push(result.email);
  });

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "monzyn1995@gmail.com",
      pass: "montu@Puneet",
    },
  });

  cron.schedule("* * 23 * * *", () => {
    console.log("sending email");
    var htmlTemplate = "";

    appointmentArray.forEach(function (to, i, array) {
      var appointmentCardFrom = "";
      var appointmentCardOn = "";
      to.studentAppointment.forEach(function (j) {
        appointmentCardFrom += j.slot + " ,";
        appointmentCardOn += j.date + " , ";
      });
      if (
        to.studentAppointment.length &&
        Array.isArray(to.studentAppointment)
      ) {
        htmlTemplate =
          `<div style="text-align: center;"> <img src="https://cdn.pixabay.com/photo/2014/04/03/11/37/glasses-312005_960_720.png" style="width: 200px; height: 100px;" /> </div> 

            Hi ` +
          to.name +
          `,
            <div>
            Reminder, you have an appointment on ` +
          appointmentCardOn +
          ` from ` +
          appointmentCardFrom +
          `  respectively 
            </div>
            
            We appreciate your Business
            <div>
            <p> To cancel the appointment </p>
            </div>
            
            <a href="http://localhost:3000/">Click Here</a> 
            
            `;
      } else {
        htmlTemplate =
          `<div style="text-align: center;"> <img src="https://cdn.pixabay.com/photo/2014/04/03/11/37/glasses-312005_960_720.png" style="width: 200px; height: 100px;" /> </div> 

        Hi,` +
          to.name +
          `
        <div>
        Reminder, you have no appointment.   
                
        We appreciate your Business. To schedule an appointment 
        
        <a href="http://localhost:3000/">Click here</a> 
        </div>
        
       `;
      }
      console.log(htmlTemplate);

      let mailOptions = {
        from: "monzyn1995@gmail.com",
        subject: "Appointment Reminder",
        text: "Testing Nodemailer",
        html: htmlTemplate,
      };
      // mailOptions.to = to;
      mailOptions.to = to.email;

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log("error occurred", err);
        } else {
          console.log("email sent", info);
        }
      });
      console.log(to.email);
    });
  });
};
start();

app.listen(8000);
