const mongoose = require("mongoose");

const bandaSchema = new mongoose.Schema({
    color: { type: String },
    cantidad: {type: Number},
    tipo: { type: String, required: true }
})

module.exports = mongoose.model("sensordatas", bandaSchema)