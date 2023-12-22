/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("notes", (builder) => {
    builder.increments("id");
    builder.text("title");
    builder.text("description");
    builder.integer("rating");
    builder
      .integer("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    builder.timestamp("created_at").defaultTo(knex.fn.now());
    builder.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("notes");
};
