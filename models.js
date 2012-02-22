(function() {
  var Person, mongoose, personSchema;

  mongoose = require('mongoose');

  personSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String
  });

  Person = mongoose.model("person", personSchema);

  module.exports = {
    Person: Person
  };

}).call(this);
