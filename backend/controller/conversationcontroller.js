const Conversation = require('../models/conversation');
const ConversationHistory = require('../models/conversationhistory');

exports.createConversation = async (req, res) => {
  try {
    const conversation = new Conversation(req.body);
    await conversation.save();

    // Add conversation history entry
    const conversationHistory = new ConversationHistory({
      user_id: req.body.user_id,
      conversation_id: conversation._id,
      category: req.body.category,
    });
    await conversationHistory.save();

    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create conversation' });
  }
};

exports.getConversationById = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id);
    if (!conversation) return res.status(404).json({ error: 'Conversation not found' });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve conversation' });
  }
};
