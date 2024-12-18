const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validateCategory = [
  body("name")
    .trim()
    .isAlpha()
    .withMessage(`Category name must only contain alphabets`)
    .isLength({ min: 1, max: 255 })
    .withMessage(`Category name must be less than 255 characters`),
  body("description")
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage(`Category name must be less than 255 characters`),
];

async function getAllCategories(req, res) {
  const categories = await db.getAllCategories();
  res.render("category", { title: "Category Page", categories: categories });
}

async function getCreateCategoryForm(req, res) {
  await res.render("createCategory", { title: "Create a new Category" });
}

async function createCategory(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("createCategory", {
      title: "Create category error",
      errors: errors.array(),
    });
  }
  const { name, description } = req.body;
  const user = "Alan.A";
  const date = new Date();
  await db.createCategory(name, description, user, date);
  res.redirect("/category");
}

async function getUpdateCategoryForm(req, res) {
  try {
    const category = await db.getCategoryById(req.params.id); // Add await here
    if (!category) {
      return res.status(404).send("Category not found");
    }
    res.render("updateCategory", {
      title: "Update category",
      category: category,
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
}

async function updateCategory(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("updateCategory", {
      title: "Update category error",
      errors: errors.array(),
      category: req.body, // Pass the form data back to the view
    });
  }
  const { name, description } = req.body;
  const { id } = req.params;
  await db.updateCategory(id, name, description);
  res.redirect("/category");
}

async function deleteCategory(req, res) {
  const { id } = req.params;
  await db.deleteCategory(id);
  res.redirect("/category");
}

module.exports = {
  getAllCategories,
  getCreateCategoryForm,
  createCategory,
  getUpdateCategoryForm,
  updateCategory,
  deleteCategory,
  validateCategory,
};
