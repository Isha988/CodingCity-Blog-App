const mongoose = require ("mongoose");
const { Schema } = mongoose;

module.exports = mongoose.model("blogs", new Schema({
    title : String,
    headerFile : String,
    shortDescription: String,
    content : {type: Schema.Types.ObjectId, ref: 'blogBodys'},
    category: String
}, {timestamps : true}))