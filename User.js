const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const addressSchema = new Schema({
        street: String,
        city: String
});

const userSchema = new Schema({
    name: String,
    age: Number,
    email: String,
    createdAT: Date,
    updateAt: Date,
    bestFriand: mongoose.SchemaTypes.ObjectId,
    hobbies: [String],
    address: addressSchema
});

module.exports = mongoose.model("User",userSchema);