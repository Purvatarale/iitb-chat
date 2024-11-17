const Message = require("../models/message");
const ConversationHistory = require("../models/conversationhistory");

exports.createMessage = async (req, res) => {
  try {
    const { conversation_id, message } = req.body;

    if (!conversation_id || !message) {
      return res
        .status(400)
        .json({ error: "conversation_id and message are required" });
    }

    const payload = new Message({
      conversation_id,
      message,
      sender: "user",
    });
    await payload.save();
    await ConversationHistory.updateOne(
      {
        _id: conversation_id,
      },
      {
        $set: {
          last_message: message,
          updated_at: new Date(),
        },
        $inc: {
          messages_count: 1,
        },
      }
    );

    res.status(201).json(payload);
  } catch (error) {
    res.status(500).json({ error: "Failed to create message" });
  }
};

exports.getMessagesByConversationId = async (req, res) => {
  try {
    const messages = await Message.find({
      conversation_id: req.params.conversation_id,
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve messages" });
  }
};
