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

// Send a message
router.post("/messages", messageController.createMessage);

module.exports = router;
