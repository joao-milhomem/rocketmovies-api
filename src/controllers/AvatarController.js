const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const FileHandler = require("../utils/FileHandler");

class AvatarController {
  async update(request, response) {
    const { id } = request.user;
    const filename = request.file.filename;

    const user = await knex("users").where({ id }).first();

    if (!user) {
      throw new AppError("Acesso negado", 400);
    }

    const fileHandler = new FileHandler();

    if (user.avatar) {
      await fileHandler.delete(user.avatar);
    }

    const newAvatar = await fileHandler.rescue(filename);
    user.avatar = newAvatar;

    await knex("users").update(user).where({ id });

    return response.json(user);
  }
}

module.exports = AvatarController;
