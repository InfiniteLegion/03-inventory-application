const { Router } = require("express");
const {
  getAllClasses,
  addClass,
  editClass,
  deleteClass,
} = require("../controllers/classesController.js");

const classesRouter = Router();

classesRouter.get("/", getAllClasses);
classesRouter.post("/new", addClass);
classesRouter.post("/edit", editClass);
classesRouter.post("/delete", deleteClass);

module.exports = classesRouter;
