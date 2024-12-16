const db = require("../db/queries");

async function getAllItems(req, res) {
  const items = await db.getAllItems();
  res.render("items", { title: "Category Page", items: items });
}

module.exports = { getAllItems };
