const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const authConfg = require("../configs/auth");

class SessionController {
  async create(request, response) {
    const { email, password } = request.body;

    const user = await knex("users").where({ email }).first();

    if (!user) {
      throw new AppError("Usuário e/ou senha inválidos", 401);
    }

    const checkPassword = await compare(password, user.password);

    if (!checkPassword) {
      throw new AppError("Usuário e/ou senha inválidos", 401);
    }

    const { secret, expiresIn } = authConfg.jwt;

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return response.json({ user, token }).status(201);
  }
}

module.exports = SessionController;
