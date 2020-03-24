
//Comando executado para criar a migration:
//npx knex migrate:make create_incidents

//Depois para rodar: npx knex migrate:latest

//Para desfazer a ultimo latest executado: npx knex migrate:rollback
//Listar migration executadas: npx knex migrate:status
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table) {
        table.increments();
        
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
        
        table.string('ong_id').notNullable();
        table.foreign('ong_id').references('id').inTable('ongs')

    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};