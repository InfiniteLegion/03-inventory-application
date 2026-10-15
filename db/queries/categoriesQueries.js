const pool = require("../pool.js");

const getAllCategories = async () => {
  const { rows } = await pool.query("SELECT * FROM categories ORDER BY id");
  return rows;
};

const addCategory = async (name, description) => {
  await pool.query(
    "INSERT INTO categories (name, description) VALUES ($1, $2)",
    [name, description],
  );
};

const editCategory = async (body) => {
  await pool.query(
    "UPDATE categories SET name = $1, description = $2 WHERE id = $3",
    [body.name, body.description, body.id],
  );
};

const deleteCategory = async (id) => {
  await pool.query("DELETE FROM categories WHERE id = $1", [id]);
};

module.exports = {
  getAllCategories,
  addCategory,
  deleteCategory,
  editCategory,
};
