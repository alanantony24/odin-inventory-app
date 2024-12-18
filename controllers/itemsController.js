const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validateItems = [
  body("categoryname")
    .trim()
    .isAlpha()
    .withMessage(`Category name must only contain alphabets`)
    .isLength({ min: 1, max: 255 })
    .withMessage(`Category name must be less than 255 characters`),
  body("name")
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage(`Item name must be less than 255 characters`),
  body("description")
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage(`Description must be less than 255 characters`),
  body("price")
    .trim()
    .isFloat()
    .withMessage(`Price must be a number`)
    .isFloat({ min: 1 })
    .withMessage("Price must be at least $1"),
  body("stock")
    .trim()
    .isInt()
    .withMessage(`Stock must be an number`)
    .isInt({ min: 1, max: 999 })
    .withMessage(`Stock must be minimum 1 qty or max 999 qty`),
];

async function getAllItems(req, res) {
  const items = await db.getAllItems();
  res.render("items", { title: "Items Page", items: items });
}

async function getCreateItemForm(req, res) {
  await res.render("createItem", { title: "Create a new Item" });
}

async function createItem(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("createItem", {
      title: "Create Item error",
      errors: errors.array(),
    });
  }
  const { categoryname, name, description, price, stock } = req.body;
  const user = "Alan.A";
  const date = new Date();
  await db.createItem(
    categoryname,
    name,
    description,
    user,
    date,
    price,
    stock
  );
  res.redirect("/item");
}

async function getUpdateItemForm(req, res) {
  try {
    const item = await db.getItemById(req.params.id); // Add await here
    if (!item) {
      return res.status(404).send("Item not found");
    }
    res.render("updateItem", {
      title: "Update Item",
      item: item,
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
}

async function updateItem(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("updateItem", {
      title: "Update item error",
      errors: errors.array(),
      item: req.body, // Pass the form data back to the view
    });
  }
  const { categoryname, name, description, price, stock } = req.body;
  const { id } = req.params;
  await db.updateItem(id, categoryname, name, description, price, stock);
  res.redirect("/item");
}

async function deleteItem(req, res) {
  const { id } = req.params;
  await db.deleteItem(id);
  res.redirect("/item");
}

module.exports = {
  getAllItems,
  getCreateItemForm,
  createItem,
  getUpdateItemForm,
  updateItem,
  deleteItem,
  validateItems,
};
