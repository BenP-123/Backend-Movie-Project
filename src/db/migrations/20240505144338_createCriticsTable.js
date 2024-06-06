exports.up = function (knex) {
  return knex.schema.createTable("critics", (table) => {
    table.increments("critic_id").primary();
    table.string("preferred_name");
    table.string("surname");
    table.string("organization_name");
    table.timestamps(true, true);
  })
  .catch(err => console.error('Error creating critics table:', err));  // Error logging for table creation
};

exports.down = function (knex) {
  return knex.schema.dropTable("critics")
  .catch(err => console.error('Error dropping critics table:', err));  // Error logging for table dropping
};