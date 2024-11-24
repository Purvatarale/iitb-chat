const express = require("express");
const router = express.Router();
const conversationController = require("../controller/conversationcontroller");
const messageController = require("../controller/messagecontroller");

// Create a new Conversation
router.post("/create-chat", conversationController.createConversation);

router.get(
  "/get-chats/:user_id",
  conversationController.getConversationByUserId
);

router.get(
  "/get-messages/:chat_id",
  conversationController.getConversationById
);

// Send a message
router.post("/messages", conversationController.createMessage);

module.exports = router;
