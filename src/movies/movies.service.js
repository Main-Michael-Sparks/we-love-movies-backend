const knex = require("../db/connection");

// query the db for a movie based on movie_id
function read(movieId) {
    return knex("movies")
        .select("*")
        .where({ "movie_id": movieId })
        .first();
};

// if req.query.is_movies is true query the db for movies that are showing otherwise select all movies
function list(query) {
   if (query){
       return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .select("m.movie_id as id", "m.title", "m.runtime_in_minutes","m.rating","m.image_url")
        .where({ "mt.is_showing": true })
        .distinct()
        .orderBy("m.movie_id")
    } else {
        return knex("movies").select("*");
    }
}

module.exports = {
    list,
    read
}
