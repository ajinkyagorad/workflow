// models/node.js
const mongoose = require('mongoose');

const nodeSchema = new mongoose.Schema({
  text: String,
  status: {
    type: String,
    enum: ['TODO', 'IN PROGRESS', 'DONE'],
    default: 'TODO',
  },
  children: [this],
});

module.exports = mongoose.model('Node', nodeSchema);
