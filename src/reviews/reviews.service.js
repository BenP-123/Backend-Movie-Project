const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
  preferred_name: 'critic.preferred_name',
  surname: 'critic.surname',
  organization_name: 'critic.organization_name',
});

function read(review_id) {
    return knex("reviews")
      .select("*")
      .where("review_id", review_id)
      .first();
}

function destroy(review_id) {
    return knex('reviews').where({ review_id }).del();
}

function update(updatedReview) {
  const review_id = updatedReview.review_id;
  return knex('reviews')
    .where({ review_id: review_id })
    .update(updatedReview)
    .then(() => {
      return knex('reviews')
        .join('critics as c', 'reviews.critic_id', 'c.critic_id')
        .select('reviews.content', 'reviews.created_at', 'reviews.updated_at', 'reviews.critic_id', 'reviews.movie_id',
         'reviews.review_id', 'reviews.score', 'c.organization_name', 'c.preferred_name', 'c.surname')
        .where({ review_id: review_id })
        .first()
        .then(addCritic);
    });
}


module.exports = {
  read,
  update,
  destroy,
};
