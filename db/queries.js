const pool = require("../db/pool");

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function getCategoryById(id) {
  const { rows } = await pool.query("SELECT * FROM categories WHERE id = $1", [
    id,
  ]);
  return rows[0];
}

async function getAllItems() {
  const { rows } = await pool.query("SELECT * FROM items");
  return rows;
}

async function createCategory(name, description, user, date) {
  await pool.query(
    "INSERT INTO categories (name, description, createdBy, createdOn) VALUES ($1, $2, $3, $4)",
    [name, description, user, date]
  );
}

async function updateCategory(id, name, description) {
  const fields = [];
  const values = [];
  let query = "UPDATE categories SET";

  if (name) {
    fields.push(`"name" = $1`);
    values.push(name);
  }

  if (description) {
    fields.push("description = $2");
    values.push(description);
  }

  query += fields.join(", ");
  query += " WHERE id = $3";
  values.push(id);

  await pool.query(query, values);
}

module.exports = {
  getAllCategories,
  getCategoryById,
  getAllItems,
  createCategory,
  updateCategory,
};
