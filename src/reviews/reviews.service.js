const knex = require("../db/connection");

// check the db for the provided review id
function read(reviewId) {

    return knex("reviews")
        .select("*")
        .where({"review_id": reviewId})
        .first();

};

// delete the review based on review id from the db
function destroy(reviewId){

    return knex("reviews")
        .where({ "review_id": reviewId })
        .del();
        
};

module.exports = {
    read,
    delete: destroy
};