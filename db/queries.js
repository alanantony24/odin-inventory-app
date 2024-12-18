const pool = require("../db/pool");

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function getAllItems() {
  const { rows } = await pool.query("SELECT * FROM items");
  return rows;
}

async function getCategoryById(id) {
  const { rows } = await pool.query("SELECT * FROM categories WHERE id = $1", [
    id,
  ]);
  return rows[0];
}

async function getItemById(id) {
  const { rows } = await pool.query("SELECT * FROM items WHERE id = $1", [id]);
  return rows[0];
}

async function getItemByCategory(categoryname) {
  const { rows } = await pool.query(
    "SELECT * FROM items WHERE categoryname = $1",
    [categoryname]
  );
  return rows;
}

async function createCategory(name, description, user, date) {
  await pool.query(
    "INSERT INTO categories (name, description, createdBy, createdOn) VALUES ($1, $2, $3, $4)",
    [name, description, user, date]
  );
}

async function createItem(
  categoryname,
  name,
  description,
  createdBy,
  createdOn,
  price,
  stock
) {
  await pool.query(
    "INSERT INTO items (categoryname, name, description, createdBy, createdOn, price, stock) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [categoryname, name, description, createdBy, createdOn, price, stock]
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

async function updateItem(id, categoryname, name, description, price, stock) {
  const fields = [];
  const values = [];
  let query = "UPDATE items SET ";

  if (categoryname) {
    fields.push(`categoryname = $${fields.length + 1}`);
    values.push(categoryname);
  }
  if (name) {
    fields.push(`name = $${fields.length + 1}`);
    values.push(name);
  }

  if (description) {
    fields.push(`description = $${fields.length + 1}`);
    values.push(description);
  }

  if (price) {
    fields.push(`price = $${fields.length + 1}`);
    values.push(price);
  }

  if (stock) {
    fields.push(`stock = $${fields.length + 1}`);
    values.push(stock);
  }

  if (fields.length === 0) {
    throw new Error("No fields to update");
  }

  query += fields.join(", ");
  query += ` WHERE id = $${fields.length + 1}`;
  values.push(id);

  await pool.query(query, values);
}

async function deleteItem(id) {
  await pool.query("DELETE FROM items where id = $1", [id]);
}

async function deleteCategory(id) {
  await pool.query("DELETE FROM categories WHERE id = $1", [id]);
}

module.exports = {
  getAllCategories,
  getCategoryById,
  getAllItems,
  createCategory,
  updateCategory,
  getAllItems,
  getItemByCategory,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  deleteCategory,
};
