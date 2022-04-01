const knex = require("../db/connection");

// update the db at the provided review id
function update(updateObj) {

  return knex("reviews")
    .update({ ...updateObj })
    .where({ review_id: updateObj.review_id });

};

// check the db for the provided review id or get reviews with critics.
function read(reviewId, meth = "get") {

  if (meth === "get") {
    return knex("reviews")
        .select("*")
        .where({ review_id: reviewId })
        .first();
  };

  if (meth === "put") {
    return knex("reviews as r")
      .join("critics as c", "r.critic_id", "c.critic_id")
      .select(
        "r.review_id",
        "r.content",
        "r.score",
        "r.critic_id",
        "r.movie_id",
        "r.created_at",
        "r.updated_at",
        "c.preferred_name",
        "c.surname",
        "c.organization_name"
      )
      .where({ "r.review_id": reviewId });
  };

};

// delete the review based on review id from the db
function destroy(reviewId) {

  return knex("reviews")
    .where({ review_id: reviewId })
    .del();

};

module.exports = {
  read,
  update,
  delete: destroy,
};
