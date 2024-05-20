const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

function list(showing) {
  if(showing){
    return knex('movies')
    .select('movies.*')
    .join('movies_theaters', 'movies.movie_id', 'movies_theaters.movie_id')
    .where('movies_theaters.is_showing', true)
    .distinct();
  }
  else{
    return knex('movies').select('*');
  }
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
    .join('theaters as t', 'mt.theater_id', 't.theater_id')
    .select('mt.theater_id', 't.name', 't.address_line_1', 't.address_line_2',
     't.city', 't.state', 't.zip', 'mt.created_at', 'mt.updated_at', 'mt.is_showing', 'm.movie_id')
    .where('mt.movie_id', movie_id );
}

function listReviews(movie_id) {
    return knex('reviews as r')
    .join('critics as c', 'r.critic_id', 'c.critic_id')
    .select('r.review_id', 'r.content', 'r.score', 'r.created_at', 'r.updated_at', 'r.critic_id', 'r.movie_id', 
    'c.preferred_name', 'c.surname', 'c.organization_name')
    .where({ movie_id })
    .then((reviews) => {
      return reviews.map(addCritic);
    });
  }

module.exports = {
  list,
  read,
  listTheaters,
  listReviews,
};
