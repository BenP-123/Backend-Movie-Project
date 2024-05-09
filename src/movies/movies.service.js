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

function list(showing) {
  if(showing){
    return knex('movies as m')
    .join('movies_theaters as mt', 'm.movie_id', 'mt.movie_id')
    .select('m.movie_id', 'm.title', 'm.runtime_in_minutes', 'm.rating', 'm.description', 'm.image_url')
    .where('mt.is_showing', '=', true);
  }
  return knex("movies").select("*")
}

function read(movie_id) {
    return knex('movies as m')
      .select('*')
      .where({ movie_id })
      .first();
  }

function listTheaters(movie_id) {
    return knex('movies as m')
    .join('movies_theaters as mt', 'm.movie_id', 'mt.movie_id')
    .select('mt.theater_id', 'mt.name', 'mt.address_line_1', 'mt.address_line_2',
     'mt.city', 'mt.state', 'mt.zip', 'mt.created_at', 'mt.updated_at', 'mt.is_showing', 'm.movie_id')
    .where({ movie_id });
}

function listReviews(movie_id) {
    return knex('reviews as r')
    .join('critics as c', 'r.critic_id', 'c.critic_id')
    .select('r.review_id', 'r.content', 'r.score', 'r.created_at', 'r.updated_at', 'r.critic_id', 'r.movie_id')
    .where({ movie_id })
    .first()
    .then(addCritic);
  }

module.exports = {
  list,
  read,
  listTheaters,
  listReviews,
};
