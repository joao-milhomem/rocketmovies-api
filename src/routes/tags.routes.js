const { Router } = require("express");
const TagsController = require("../controllers/TagsController");
const tagsRouter = Router();

const tagsController = new TagsController();
const credentials = require("../middlewares/ensureAuth");

tagsRouter.get("/", credentials, tagsController.index);

module.exports = tagsRouter;
