const { hash, compare } = require("bcryptjs");
const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;
    const checkEmailOnDB = await knex("users").where({ email }).first();

    if (!name || !email || !password) {
      throw new AppError("Preencha todos os campos", 400);
    }

    if (checkEmailOnDB) {
      throw new AppError("Email já esta sendo utilizado");
    }

    const hashedPassword = await hash(password, 8);

    await knex("users").insert({ name, email, password: hashedPassword });

    response.status(201).json({ message: "Usuário cadastrado com sucesso" });
  }

  async delete(request, response) {
    const { id } = request.user;

    const [user] = await knex("users").where({ id });

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    await knex("users").where({ id }).delete();

    return response.json({ message: "Usuário deletado com sucesso" });
  }

  async update(request, response) {
    const id = request.user.id;
    const { name, email, newPassword, currentPassword } = request.body;

    const user = await knex("users").where({ id }).first();
    const emailOwner = await knex("users").where({ email }).first();

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    if (emailOwner && emailOwner.id != id) {
      throw new AppError("Email já está sendo usado");
    }

    if (newPassword && !currentPassword) {
      throw new AppError("Digite a senha atual");
    }

    if (newPassword && currentPassword) {
      const checkPassword = await compare(currentPassword, user.password);

      if (checkPassword) {
        user.password = await hash(newPassword, 8);
      } else throw new AppError("Senhas não conferem", 401);
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    await knex("users").where({ id }).update(user);

    return response.json("Usuário atualizado com sucesso!");
  }
}

module.exports = UsersController;
