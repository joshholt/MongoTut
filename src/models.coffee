mongoose	= require 'mongoose'
Schema    = mongoose.Schema

personSchema = new Schema
	first_name: String
	last_name:  String
	email:			String


Person = mongoose.model "person", personSchema

module.exports = { Person }