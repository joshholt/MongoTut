(function() {
  var add_person, conf, counter, db, display_doc, insert_people, models, mongoose, people, print_people;

  conf = require('./config');

  mongoose = require('mongoose');

  db = mongoose.connect(conf.db_url);

  models = require('./models');

  mongoose.connection.on("open", function() {
    return console.log("Connected to Mongo...");
  });

  mongoose.connection.on("error", function(err, res) {
    return console.log("An Error occured " + err);
  });

  counter = 0;

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

  add_person = function(person) {
    var p;
    p = new models.Person(person);
    return p.save(function(err) {
      if (err) console.log(err);
      counter += 1;
      if (counter >= people.length) return models.Person.find({}, print_people);
    });
  };

  display_doc = function(doc) {
    console.log("********************************************************************************");
    console.log("" + doc.first_name + " " + doc.last_name);
    console.log("" + doc.email);
    return console.log("********************************************************************************");
  };

  print_people = function(err, docs) {
    var doc, _i, _len;
    for (_i = 0, _len = docs.length; _i < _len; _i++) {
      doc = docs[_i];
      display_doc(doc);
    }
    console.log("Done...");
    return mongoose.disconnect();
  };

  insert_people = function() {
    var person, _i, _len;
    for (_i = 0, _len = people.length; _i < _len; _i++) {
      person = people[_i];
      add_person(person);
    }
    return console.log("Inserted People...");
  };

  models.Person.find({}, function(err, docs) {
    if (err) return console.log(err);
    if (docs && docs.length <= 0) {
      console.log("About to insert_people...");
      return insert_people();
    } else {
      return print_people(err, docs);
    }
  });

}).call(this);
