(function() {
  var conf, db, models, mongoose;

  conf = require('./config');

  mongoose = require('mongoose');

  models = require('./models');

  db = mongoose.connect(conf.db_url);

  models.Person.find({}, function(err, docs) {
    var doc, p, people, person, _i, _j, _len, _len2;
    if (err) return console.log(err);
    if (!docs) {
      people = [
        {
          first_name: "Suvajit",
          last_name: "Gupta",
          email: "suvajit.gupta@eloqua.com"
        }, {
          first_name: "Josh",
          last_name: "Holt",
          email: "josh.holt@eloqua.com"
        }
      ];
      for (_i = 0, _len = people.length; _i < _len; _i++) {
        person = people[_i];
        p = new Person(person);
        p.save(function(err) {
          if (err) return console.log(err);
        });
      }
    } else {
      for (_j = 0, _len2 = docs.length; _j < _len2; _j++) {
        doc = docs[_j];
        console.log("********************************************************************************");
        console.log("" + doc.first_name + " " + doc.last_name);
        console.log("" + doc.email);
        console.log("********************************************************************************");
      }
    }
    return mongoose.disconnect();
  });

}).call(this);
