const itemsDB = require("../db/queries/itemsQueries.js");
const itemClassesDB = require("../db/queries/itemClassesQueries.js");
const categoriesDB = require("../db/queries/categoriesQueries.js");
const classesDB = require("../db/queries/classesQueries.js");

const getAllItems = async (req, res) => {
  try {
    const items = await itemsDB.getAllItems();
    const classes = await classesDB.getAllClasses();
    const categories = await categoriesDB.getAllCategories();
    const data = await Promise.all(
      items.map(async (i) => ({
        ...i,
        category: await categoriesDB.getCategoryById(i.category_id),
        classes: await itemClassesDB.getAllClassesByItemId(i.id),
      })),
    );

    res.render("items/index", {
      items: data,
      classes: classes,
      categories: categories,
    });
  } catch (error) {
    res.status(500).send(`Internal server error.\n${error.message}`);
  }
};

const addItem = async (req, res) => {
  const { name, description, price, quantity, rarity, category_id, classes } =
    req.body;

  try {
    await itemsDB.addItem(
      name,
      description,
      price,
      quantity,
      rarity,
      category_id,
      classes,
    );

    res.redirect("/items");
  } catch (error) {
    if (error.code === "23505") {
      const data = await itemsDB.getAllItems();
      const items = await Promise.all(
        data.map(async (i) => ({
          ...i,
          category: await categoriesDB.getCategoryById(i.category_id),
          classes: await itemClassesDB.getAllClassesByItemId(i.id),
        })),
      );

      return res.status(409).render("items", {
        error: `Item "${name}" already exists.`,
        items: items,
        classes: await classesDB.getAllClasses(),
        categories: await categoriesDB.getAllCategories(),
        formData: {
          name,
          description,
          price,
          quantity,
          rarity,
          category_id,
          classes,
        },
        openAddModal: true,
      });
    }

    res.status(500).send(`Internal server error: ${error.message}`);
  }
};

module.exports = { getAllItems, addItem };
