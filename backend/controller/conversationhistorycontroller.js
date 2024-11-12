const ConversationHistory = require('../models/conversationhistory');

exports.getConversationHistoryByUser = async (req, res) => {
  try {
    const history = await ConversationHistory.find({ user_id: req.params.user_id });
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve conversation history' });
  }
};
