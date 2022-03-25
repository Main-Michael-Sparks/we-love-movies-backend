// create table named critics
exports.up = function(knex) {
    return knex.schema.createTable("critics", (table) =>{
        table.increments("critic_id").primary();
        table.string("preferred_name");
        table.string("surname");
        table.string("organization_name");
        table.timestamp(true,true);
    });
};

// drop table named critics
exports.down = function(knex) {
    return knex.schema.dropTable("critics");
};
