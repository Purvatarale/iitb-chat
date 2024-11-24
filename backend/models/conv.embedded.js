const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["open", "closed"], default: "open" },
  created_at: { type: Date, default: Date.now },
  last_activity_time: { type: Date, default: Date.now },
  messages: [
    {
      sender: { type: String, enum: ["user", "staff"], required: true },
      message: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Conversation", conversationSchema);
