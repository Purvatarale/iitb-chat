const Conversation = require("../models/conversation");
const ConversationHistory = require("../models/conversationhistory");

exports.createConversation = async (req, res) => {
  try {
    const { user_id, category } = req.body;

    if (!user_id || !category)
      return res
        .status(400)
        .json({ error: "Missing required fields - user_id, category" });

    const conversation = new Conversation({
      user_id,
      category,
      status: "open",
    });

    await conversation.save();

    // Add conversation history entry
    const conversationHistory = new ConversationHistory({
      user_id,
      conversation_id: conversation._id,
      category,
    });
    await conversationHistory.save();

    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({ error: "Failed to create conversation" });
  }
};

exports.getConversationByUserId = async (req, res) => {
  try {
    if (!req.params.user_id)
      return res
        .status(400)
        .json({ error: "Missing required fields - user_id" });
    const conversations = await Conversation.find({
      user_id: req.params.user_id,
    });
    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve conversations" });
  }
};

exports.getConversationById = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id);
    if (!conversation)
      return res.status(404).json({ error: "Conversation not found" });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve conversation" });
  }
};
