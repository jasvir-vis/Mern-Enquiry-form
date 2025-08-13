// models/Data.js
const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    message: String
});

// ✅ Export the model, not the schema
module.exports = mongoose.model('Data', dataSchema);