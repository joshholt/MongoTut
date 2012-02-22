conf  	 = require './config'
mongoose = require 'mongoose'
models   = require './models'
db			 = mongoose.connect conf.db_url


models.Person.find {}, (err, docs) ->
	return console.log err if err
	if not docs	
		people = [{
			first_name: "Suvajit"
			last_name:  "Gupta"
			email: "suvajit.gupta@eloqua.com"
		},{
			first_name: "Josh"
			last_name: "Holt"
			email: "josh.holt@eloqua.com"
		}]

		for person in people
			p = new Person person
			p.save (err) ->
				console.log err if err
	else
		for doc in docs
			console.log "********************************************************************************"
			console.log "#{doc.first_name} #{doc.last_name}"
			console.log "#{doc.email}"
			console.log "********************************************************************************"
	
	mongoose.disconnect()

# Show off map reduce...
# mapFunc = ->
# 	key = @email
# 	values = 
# 		key: @email
# 		name: "#{@first_name} #{@last_name}"
# 		email: "#{@email}"
# 	emit key, values

# reduceFunc = (key, values) ->
# 	ret =
# 		person: values[key].name
# 		email: key
# 	ret

# Person.collection.mapReduce mapFunc.toString(), reduceFunc.toString(), {out: "results"}, (err, val) ->
# 	console.log err if err