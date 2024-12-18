const { Router } = require("express");
const itemsController = require("../controllers/itemsController");
const itemsRouter = Router();

itemsRouter.get("/", itemsController.getAllItems);

itemsRouter.get("/new", itemsController.getCreateItemForm);
itemsRouter.post(
  "/new",
  itemsController.validateItems,
  itemsController.createItem
);
itemsRouter.get("/:id/update", itemsController.getUpdateItemForm);
itemsRouter.get(
  "/:id/delete",
  itemsController.deleteItem
);

module.exports = itemsRouter;
