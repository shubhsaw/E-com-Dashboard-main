const mongoose = require('./db'); // use same connection

const userSchema = mongoose.Schema({
  email: String,
  password: String,
  firstname: String,
  lastname: String
});

module.exports = mongoose.model("userData", userSchema);
