const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
  filename: String,
  path: String,
  uploadedAt: Date
});

module.exports = mongoose.model('Photo', PhotoSchema);
