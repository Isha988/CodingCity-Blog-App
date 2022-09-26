const mongoose = require ("mongoose");
const { Schema } = mongoose;

module.exports = mongoose.model("blogBodys", new Schema({
    content : String
}, {timeStamps : true}))