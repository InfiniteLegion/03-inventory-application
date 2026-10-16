const db = require("../db/queries/classesQueries.js");

const getAllClasses = async (req, res) => {
  try {
    const classes = await db.getAllClasses();

    res.render("classes/index", { data: classes });
  } catch (error) {
    res.status(500).send(`Internal server error.\n${error}`);
  }
};

const addClass = async (req, res) => {
  const { name, description } = req.body;

  try {
    await db.addClass(name, description);
    res.redirect("/classes");
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).render("classes", {
        data: await db.getAllClasses(),
        error: `Class "${name}" already exists.`,
        formData: { name, description },
        openAddModal: true,
      });
    }

    res.status(500).send(`Internal server error.\n${error}`);
  }
};

const editClass = async (req, res) => {
  try {
    await db.editClass(req.body);
    res.redirect("/classes");
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).render("classes", {
        data: await db.getAllClasses(),
        error: `Class "${req.body.name}" already exists.`,
        formData: req.body,
        openEditModal: true,
      });
    }

    res.status(500).send(`Internal server error.\n${error}`);
  }
};

const deleteClass = async (req, res) => {
  try {
    const { id } = req.body;

    await db.deleteClass(id);
    res.redirect("/classes");
  } catch (error) {
    res.status(500).send(`Internal server error.\n${error}`);
  }
};

module.exports = { getAllClasses, addClass, editClass, deleteClass };
