const mongoose = require('mongoose');

mongoose.connect(process.env.CLUSTER_URI)
.then(() => console.log("MongoDB Atlas Connected"))
.catch(err => console.log("DB Error:", err));

module.exports = mongoose;
