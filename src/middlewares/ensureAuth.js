const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const auth = require("../configs/auth");

function ensureAuth(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token JWT não encontrado.");
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, auth.jwt.secret);

    request.user = {
      id: Number(user_id),
    };

    return next();
  } catch {
    throw new AppError("Token JWT inválido.");
  }
}

module.exports = ensureAuth;
