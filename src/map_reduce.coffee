# Show off map reduce...
# mapFunc = ->
#   key = @email
#   values = 
#     key: @email
#     name: "#{@first_name} #{@last_name}"
#     email: "#{@email}"
#   emit key, values

# reduceFunc = (key, values) ->
#   ret =
#     person: values[key].name
#     email: key
#   ret

# Person.collection.mapReduce mapFunc.toString(), reduceFunc.toString(), {out: "results"}, (err, val) ->
#   console.log err if err