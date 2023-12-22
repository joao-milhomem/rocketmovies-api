const { Router } = require("express");
const NotesController = require("../controllers/NotesController");

const notesRouter = Router();
const notesController = new NotesController();

const Credentials = require("../middlewares/ensureAuth");

notesRouter.get("/", Credentials, notesController.index);
notesRouter.get("/:id", notesController.show);

notesRouter.post("/", Credentials, notesController.create);
notesRouter.delete("/:id", notesController.delete);

notesRouter.put("/:id", notesController.update);

module.exports = notesRouter;
