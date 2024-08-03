const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    searches: {type:[String], require:true,unique: true},
    favorites:{type:[Object], require:true,unique: true}
  });
  
  const User = mongoose.model('User', userSchema);

  module.exports = User;