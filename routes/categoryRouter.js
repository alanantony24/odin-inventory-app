const { Router } = require("express");
const categoriesController = require("../controllers/categoryController");
const categoriesRouter = Router();

categoriesRouter.get("/", categoriesController.getAllCategories);

categoriesRouter.get("/new", categoriesController.getCreateCategoryForm);
categoriesRouter.post(
  "/new",
  categoriesController.validateCategory,
  categoriesController.createCategory
);
categoriesRouter.get("/:id/update", categoriesController.getUpdateCategoryForm);
categoriesRouter.post(
  "/:id/update",
  categoriesController.validateCategory,
  categoriesController.updateCategory
);

module.exports = categoriesRouter;
