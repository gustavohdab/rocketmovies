exports.up = function (knex) {
  return knex.schema.createTable('tags', (table) => {
    table.increments('id')
    table.integer('note_id').notNullable().references('id').inTable('notes').onDelete('CASCADE');
    table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.text('name').notNullable();
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('tags');
};
