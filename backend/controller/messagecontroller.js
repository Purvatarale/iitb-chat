const Message = require('../models/message');

exports.createMessage = async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create message' });
  }
};

exports.getMessagesByConversationId = async (req, res) => {
  try {
    const messages = await Message.find({ conversation_id: req.params.conversation_id });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
};