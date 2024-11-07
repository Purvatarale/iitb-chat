const { Router } = require("express");
const { getChatCategories } = require("../controller/static.controller");
const staticRouter = Router();

staticRouter.get("/get-chat-categories", getChatCategories);

module.exports = staticRouter;
