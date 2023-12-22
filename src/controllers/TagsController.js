const knex = require("../database/knex");

class TagsController {
  async index(request, response) {
    const { id } = request.user;

    const allUserTags = await knex("tags").where({ user_id: id });

    return response.json(allUserTags);
  }
}

module.exports = TagsController;
