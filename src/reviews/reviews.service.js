const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
  critic_id: 'critic.critic_id',
  preferred_name: 'critic.preferred_name',
  surname: 'critic.surname',
  organization_name: 'critic.organization_name',
  created_at: 'critic.created_at',
  updated_at: 'critic.updated_at',
});

function read(review_id) {
    return knex("reviews")
      .select('*')
      .where({ review_id })
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
        .select('reviews.*', )
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
