exports.up = function (knex) {
  return knex.schema.createTable('notes', function (table) {
    table.increments('id').primary();
    table.text('title').notNullable().unique();
    table.text('description').notNullable();
    table.integer('rating').notNullable();
    table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');

    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('notes');
};
