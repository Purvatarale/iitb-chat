const mongoose = require("mongoose");

const conversationHistorySchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  conversation_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
    required: true,
  },
  category: { type: String, required: true },
  last_message: { type: String },
  status: { type: String, enum: ["open", "closed"], default: "open" },
  messages_count: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model(
  "ConversationHistory",
  conversationHistorySchema
);
