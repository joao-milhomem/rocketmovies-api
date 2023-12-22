const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class NotesController {
  async create(request, response) {
    const { id } = request.user;
    const { title, description, rating, tags } = request.body;

    const [user] = await knex("users").where({ id });

    if (!user) {
      throw new AppError("Usuário não encontrado", 401);
    }

    const [note_id] = await knex("notes").insert({
      title,
      description,
      rating,
      user_id: id,
    });

    const editedTags = tags.map((name) => {
      return {
        note_id,
        user_id: id,
        name,
      };
    });

    await knex("tags").insert(editedTags);

    return response.json({ message: "Nota cadastrada com sucesso!" });
  }

  async index(request, response) {
    const { id } = request.user;
    const { title } = request.query;

    const allNotes = await knex("notes")
      .where({ user_id: id })
      .whereLike("title", `%${title}%`);

    const allUserTags = await knex("tags").where({ user_id: id });

    const notesWithTags = allNotes.map((note) => {
      const filteredTags = allUserTags.filter((tag) => tag.note_id === note.id);
      return {
        ...note,
        tags: filteredTags,
      };
    });

    return response.json(notesWithTags);
  }

  async show(request, response) {
    const { id } = request.params;
    const [note] = await knex("notes").where({ id });

    if (!note) {
      throw new AppError("Nota não encontrada", 401);
    }

    const tags = await knex("tags").where({ note_id: id });

    note.tags = tags;

    return response.json(note);
  }

  async delete(request, response) {
    const { id } = request.params;

    const [note] = await knex("notes").where({ id });

    if (!note) {
      throw new AppError("Nota não encontrada");
    }

    await knex("notes").where({ id }).delete();

    return response.json();
  }

  async update(request, response) {
    const { title, description, rating, tags } = request.body;
    const { id } = request.params;

    const { user_id } = await knex("notes").where({ id }).first();
    const [note] = await knex("notes").where({ id });

    const tagNames = tags.map((tag) => tag.trim());

    if (!note) {
      throw new AppError("Nota não encontrada");
    }

    const editedNote = {
      title,
      description,
      rating,
    };

    await knex("notes").where({ id }).update(editedNote);

    const tagsToInsert = tagNames.map((name) => {
      return {
        note_id: id,
        user_id,
        name,
      };
    });

    await knex("tags").where({ note_id: id }).delete();
    await knex("tags").insert(tagsToInsert);

    return response.json();
  }
}

module.exports = NotesController;
