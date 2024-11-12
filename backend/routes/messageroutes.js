const express = require('express');
const router = express.Router();
const messageController = require('../controller/messagecontroller');

router.post('/messages', messageController.createMessage);
router.get('/messages/conversation/:conversation_id', messageController.getMessagesByConversationId);

module.exports = router;