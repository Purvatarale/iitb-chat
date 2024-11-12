const express = require('express');
const router = express.Router();
const conversationController = require('../controller/conversationcontroller');

router.post('/conversations', conversationController.createConversation);
router.get('/conversations/:id', conversationController.getConversationById);

module.exports = router;
