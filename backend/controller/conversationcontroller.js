const Conversation = require("../models/conv.embedded");
const ConversationHistory = require("../models/conversationhistory");
const { formatMessages } = require("../helpers/format-conversations");
const WebSocket = require("ws");
const wsService = require("../socket/socket.service");

exports.createConversation = async (req, res) => {
  try {
    const { name, email, category, description } = req.body;

    if (!name || !email || !category || !description)
      return res.status(400).json({
        error: "Missing required fields - user_id, category, description",
      });

    const existingConversation = await Conversation.findOne({
      email,
      category,
      description,
    });

    if (existingConversation) {
      if (existingConversation.status === "closed") {
        existingConversation.status = "open";
        await existingConversation.save();
        return res.status(200).json(existingConversation);
      }
      return res.status(200).json(existingConversation);
    }

    const conversation = new Conversation({
      name,
      email,
      category,
      description,
      status: "open",
      messages: [],
    });

    await conversation.save();

    res.status(201).json(conversation);
  } catch (error) {
    console.error(error);
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
      email: req.params.user_id,
    }).sort({ created_at: -1 });
    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve conversations" });
  }
};

exports.getConversationById = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.chat_id).sort({
      last_activity_time: -1,
    });
    if (!conversation)
      return res.status(404).json({ error: "Conversation not found" });
    const messages = formatMessages(conversation.messages);
    res.status(200).json({ ...conversation.toJSON(), messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve conversation" });
  }
};

exports.createMessage = async (req, res) => {
  try {
    const { conversation_id, message, sender } = req.body;

    if (!conversation_id || !message) {
      return res
        .status(400)
        .json({ error: "conversation_id and message are required" });
    }

    const conversation = await Conversation.findById(conversation_id);

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    const payload = {
      sender: sender || "user",
      message,
      timestamp: new Date(),
    };

    conversation.messages.push(payload);

    await conversation.save();

    await wsService.sendMessage({
      chatId: conversation_id,
      sender: payload.sender,
      message: payload.message,
      timestamp: payload.timestamp,
    });

    res.status(201).json(payload);
  } catch (error) {
    res.status(500).json({ error: "Failed to create message" });
    console.error(error);
  }
};

// Add a message to an existing conversation
// exports.addMessageToConversation = async (req, res) => {
//   try {
//     const { conversation_id, sender, message } = req.body;

//     if (!conversation_id || !sender || !message) {
//       return res.status(400).json({
//         error: "Missing required fields - conversation_id, sender, message",
//       });
//     }

//     const conversation = await Conversation.findById(conversation_id);

//     if (!conversation) {
//       return res.status(404).json({ error: "Conversation not found" });
//     }

//     // Add the new message to the conversation's messages array
//     conversation.messages.push({
//       sender,
//       message,
//       timestamp: new Date(),
//     });

//     // Update the conversation's last activity time
//     conversation.last_activity_time = new Date();
//     await conversation.save();

//     res.status(201).json({ message: "Message added", conversation });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to add message" });
//   }
// };
