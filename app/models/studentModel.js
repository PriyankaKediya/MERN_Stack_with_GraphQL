// Load the module dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
//
// Define a new 'UserSchema'
var StudentSchema = new Schema({
    studentNo: {
		type: String,
		required: [true, "Please add a student number"],
		unique: [true, "Student number must be unique"],
	  },
	  password: {
		type: String,
		required: [true, "Please add a password"],
	  },
	  firstName: {
		type: String,
		required: [true, "Please add a first name"],
	  },
	  lastName: {
		type: String,
		required: [true, "Please add a last name"],
	  },
	  address: {
		type: String,
		required: [true, "Please add an address"],
	  },
	  city: {
		type: String,
		required: [true, "Please add an city"],
	  },
	  phoneNumber: {
		type: String,
		required: [true, "Please add an phone number"],
	  },
	  email: {
		type: String,
		required: [true, "Please add an email"],
		unique: [true, "Email must be unique"],
	  },
	  program: {
		type: String,
		required: [true, "Please add a program"],
	  }	,
	  courses: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
        }]
});

// Set the 'fullname' virtual property
StudentSchema.virtual('fullName').get(function() {
	return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
	const splitName = fullName.split(' ');
	this.firstName = splitName[0] || '';
	this.lastName = splitName[1] || '';
});


// Configure the 'UserSchema' to use getters and virtuals when transforming to JSON
StudentSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

// Create the 'User' model out of the 'UserSchema'
module.exports = mongoose.model('Student', StudentSchema);

