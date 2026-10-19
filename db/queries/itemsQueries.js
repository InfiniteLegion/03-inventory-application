const pool = require("../pool.js");
const itemClassesDB = require("./itemClassesQueries.js");

const getAllItems = async () => {
  const { rows } = await pool.query("SELECT * FROM items ORDER BY id");

  return rows;
};

const addItem = async (
  name,
  description,
  price,
  quantity,
  rarity,
  category_id,
  classes,
) => {
  const classIds = classes ? [].concat(classes) : [];
  const client = await pool.connect();

  try {
    const { rows } = await pool.query(
      "INSERT INTO items (name, description, price, quantity, rarity, category_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
      [name, description, price, quantity, rarity, category_id],
    );

    const itemId = rows[0].id;

    for (const classId of classIds) {
      await itemClassesDB.addItemClass(itemId, classId, client);
    }

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

const editItem = async (body, classes) => {
  const { id, name, description, price, quantity, rarity, category_id } = body;

  await pool.query(
    "UPDATE items SET name = $1, description = $2, price = $3, quantity = $4, rarity = $5, category_id = $6 WHERE id = $7",
    [name, description, price, quantity, rarity, category_id, id],
  );

  // const { rows } = await itemClassesDB.getAllClassesByItemId(id);
  //
  // await Promise.all(rows.map((r) => itemClassesDB.deleteItemClass(r.id)));
  //
  // await Promise.all(classes.map((c) => itemClassesDB.addItemClass(id, c.id)));
};

const deleteItem = async (id) => {
  await pool.query("DELETE FROM items WHERE id = $1", [id]);
};

module.exports = { getAllItems, addItem, editItem, deleteItem };
