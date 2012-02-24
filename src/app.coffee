conf     = require './config'
mongoose = require 'mongoose'
db       = mongoose.connect conf.db_url
models   = require './models'

mongoose.connection.on "open",  -> console.log "Connected to Mongo..."
mongoose.connection.on "error", (err, res) -> console.log "An Error occured #{err}"

counter = 0

people = [{
  first_name: "Suvajit"
  last_name:  "Gupta"
  email: "suvajit.gupta@eloqua.com"
},{
  first_name: "Josh"
  last_name: "Holt"
  email: "josh.holt@eloqua.com"
}]

add_person = (person) ->
  p = new models.Person person
  p.save (err) ->
    console.log err if err
    counter += 1
    if counter >= people.length
      models.Person.find {}, print_people


display_doc = (doc) ->
  console.log "********************************************************************************"
  console.log "#{doc.first_name} #{doc.last_name}"
  console.log "#{doc.email}"
  console.log "********************************************************************************"

print_people = (err, docs) ->
  display_doc doc for doc in docs
  console.log "Done..."
  mongoose.disconnect()

insert_people = ->
  add_person person for person in people
  console.log "Inserted People..."

models.Person.find {}, (err, docs) ->
  return console.log err if err
  if docs && docs.length <= 0
    console.log "About to insert_people..."
    insert_people()
  else
    print_people err, docs
