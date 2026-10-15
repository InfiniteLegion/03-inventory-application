const { Router } = require("express");
const {
  getAllCategories,
  addCategory,
  deleteCategory,
  editCategory,
} = require("../controllers/categoriesController.js");

const categoriesRouter = Router();

categoriesRouter.get("/", getAllCategories);
categoriesRouter.post("/new", addCategory);
categoriesRouter.post("/edit", editCategory);
categoriesRouter.post("/delete", deleteCategory);

module.exports = categoriesRouter;
