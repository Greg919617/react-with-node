const mongoose = require('mongoose');

//the mongoose object has a property called schema, 
//take that property and assign it to a new variable called schema
//destructuring
//same as const Schema = mongoose.Schema;


const { Schema } = mongoose;

//create schema for new collection, will desccribe individaul records will look like

const userSchema = new Schema({
    googleId:String
});

//create model class
//users is name of collection
//userSchema
//freely add or subtract propeties as we please

mongoose.model('users', userSchema);