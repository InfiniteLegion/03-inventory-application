const { Router } = require("express");
const { getAllItems, addItem } = require("../controllers/itemsController.js");

const itemsRouter = Router();

itemsRouter.get("/", getAllItems);
itemsRouter.post("/new", addItem);

module.exports = itemsRouter;
