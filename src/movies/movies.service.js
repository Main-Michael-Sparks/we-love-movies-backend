const knex = require("../db/connection");

// query the db for a movie based on movie_id and or route
function read(movieId, currentRoute) {

    if (currentRoute === "movie") {
        return knex("movies")
            .select("*")
            .where({ "movie_id": movieId })
            .first();
    };

    if (currentRoute === "theaters") {
        return knex("movies as m")
            .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
            .join("theaters as t", "mt.theater_id", "t.theater_id")
            .select("t.*", "m.movie_id", "mt.is_showing")
            .where({"mt.movie_id": movieId});
    };

    if (currentRoute === "reviews") {
        return knex("reviews as r")
            .join("critics as c", "r.critic_id", "c.critic_id")
            .select(
                "r.review_id as rev_review_id", 
                "r.content as rev_content", 
                "r.score as rev_score",
                "r.critic_id as rev_critic_id",
                "r.movie_id as rev_movie_id",
                "r.created_at as rev_created_at",
                "r.updated_at as rev_updated_at",
                "c.preferred_name as cri_preferred_name",
                "c.surname as cri_surname",
                "c.organization_name as cri_organization_name"
            )
            .where({"r.movie_id": movieId});
    };

};

// if req.query.is_movies is true query the db for movies that are showing otherwise select all movies
function list(query) {

   if (query){
       return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .select("m.movie_id", "m.title", "m.runtime_in_minutes","m.rating","m.image_url")
        .where({ "mt.is_showing": true })
        .distinct()
        .orderBy("m.movie_id")
    } else {
        return knex("movies").select("*");
    };

};

module.exports = {
    list,
    read
};
