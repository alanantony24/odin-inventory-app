const { Router } = require("express");
const itemsController = require("../controllers/itemsController");
const itemsRouter = Router();

itemsRouter.get("/", itemsController.getAllItems);

module.exports = itemsRouter;
