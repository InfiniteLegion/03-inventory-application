const pool = require("../pool.js");

const getAllClassesByItemId = async (itemId) => {
  const { rows } = await pool.query(
    "SELECT c.* FROM classes AS c JOIN item_classes AS ic ON c.id = ic.class_id JOIN items AS i ON ic.item_id = i.id WHERE i.id = $1",
    [itemId],
  );
  return rows;
};

const addItemClass = async (itemId, classId, db = pool) => {
  await db.query(
    "INSERT INTO item_classes (item_id, class_id) VALUES ($1, $2)",
    [itemId, classId],
  );
};

const deleteItemClass = async (id) => {
  await pool.query("DELETE FROM item_classes WHERE id = $1", [id]);
};

module.exports = { getAllClassesByItemId, addItemClass, deleteItemClass };
