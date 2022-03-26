const knex = require("../db/connection");



function list(req,res,next) {
    return knex("movies").select("*");
}

module.exports = {
    list
}
