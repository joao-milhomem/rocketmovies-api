const { Router } = require("express");
const usersRouter = Router();

const UsersController = require("../controllers/UsersController");
const usersController = new UsersController();

const AvatarController = require("../controllers/AvatarController");
const avatarController = new AvatarController();

const { MULTER_CONFIG } = require("../configs/upload");
const multer = require("multer");
const upload = multer(MULTER_CONFIG);

const credentials = require("../middlewares/ensureAuth");

usersRouter.post("/", usersController.create);
usersRouter.delete("/", credentials, usersController.delete);
usersRouter.put("/", credentials, usersController.update);
usersRouter.patch(
  "/avatar",
  credentials,
  upload.single("avatar"),
  avatarController.update
);
module.exports = usersRouter;
