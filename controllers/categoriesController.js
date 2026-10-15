const db = require("../db/queries/categoriesQueries.js");

const getAllCategories = async (req, res) => {
  try {
    const categories = await db.getAllCategories();

    res.render("categories/index", { data: categories });
  } catch (error) {
    res.status(500).send(`Internal server error.\n${error}`);
  }
};

const addCategory = async (req, res) => {
  const { name, description } = req.body;

  try {
    await db.addCategory(name, description);
    res.redirect("/categories");
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).render("categories", {
        data: await db.getAllCategories(),
        error: `Category "${name}" already exists.`,
        formData: { name, description },
        openAddModal: true,
      });
    }

    res.status(500).send(`Internal server error.\n${error}`);
  }
};

const editCategory = async (req, res) => {
  try {
    await db.editCategory(req.body);
    res.redirect("/categories");
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).render("categories", {
        data: await db.getAllCategories(),
        error: `Category "${req.body.name}" already exists.`,
        formData: req.body,
        openEditModal: true,
      });
    }

    res.status(500).send(`Internal server error.\n${error}`);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.body;

    await db.deleteCategory(id);
    res.redirect("/categories");
  } catch (error) {
    res.status(500).send(`Internal server error.\n${error}`);
  }
};

module.exports = {
  getAllCategories,
  addCategory,
  deleteCategory,
  editCategory,
};
