const mongoose = require ("mongoose");

const adminSchema = mongoose.Schema({
    userName: String,
    password: String,
}, {timeStamps : true});

module.exports = mongoose.model('admins', adminSchema);