var express = require('express');
var router = express.Router();


var monk = require('monk');
var db = monk('localhost:27017/geekHunt');
console.log("database"+db);
var collection = db.get('appointments');

//date: { $gt: '2022-04-24' }
//,{sort: {date:-1}}
router.get('/', function(req, res) {
    const d = new Date();
console.log(d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate());
    collection.count( 
        {
            '$and': [
              {
                'date': {
                  '$lt': req.query.day
                }
              }, {
                '$or': [
                  {
                    'studentId': req.query.Id
                  }, {
                    'tutorId': req.query.Id
                  }
                ]
              }
            ]
          }
       // { date: { $lt: req.query.day } , studentId : req.query.studentId }
    , function(err, appointments){
        if (err) throw err;
        res.json(appointments);
    });
});

module.exports = router;