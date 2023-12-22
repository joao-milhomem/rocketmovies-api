/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", (builder) => {
    builder.increments("id");
    builder.text("name");
    builder.text("email");
    builder.text("password");
    builder.text("avatar").nullable();
    builder.timestamp("created_at").defaultTo(knex.fn.now());
    builder.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
