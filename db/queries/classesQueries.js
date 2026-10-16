const pool = require("../pool.js");

const getAllClasses = async () => {
  const { rows } = await pool.query("SELECT * FROM classes ORDER BY id");
  return rows;
};

const addClass = async (name, description) => {
  await pool.query("INSERT INTO classes (name, description) VALUES ($1,$2)", [
    name,
    description,
  ]);
};

const editClass = async (body) => {
  await pool.query(
    "UPDATE classes SET name = $1, description = $2 WHERE id = $3",
    [body.name, body.description, body.id],
  );
};

const deleteClass = async (id) => {
  await pool.query("DELETE FROM classes WHERE id = $1", [id]);
};

module.exports = { getAllClasses, addClass, editClass, deleteClass };
