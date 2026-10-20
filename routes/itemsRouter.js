const { Router } = require("express");
const {
  getAllItems,
  addItem,
  deleteItem,
  editItem,
} = require("../controllers/itemsController.js");

const itemsRouter = Router();

itemsRouter.get("/", getAllItems);
itemsRouter.post("/new", addItem);
itemsRouter.post("/edit", editItem);
itemsRouter.post("/delete", deleteItem);

module.exports = itemsRouter;
