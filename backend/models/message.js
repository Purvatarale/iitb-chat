const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  conversation_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
  sender: { type: String, enum: ['user', 'bot'], required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', messageSchema);