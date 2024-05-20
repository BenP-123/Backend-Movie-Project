const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await service.read(movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  return next({ status: 404, message: `Movie cannot be found.` });
}

async function list(req, res, next) {
  const showing = false;
  if(req.query != {}){
    showing = req.query.is_showing
  }
  res.json({ data: await service.list(showing) });
}

async function read(req, res, next) {
  const knexInstance = req.app.get("db");
  const { movie } = res.locals;
  res.json({ data: movie });
}

async function listTheaters(req, res, next) {
  const { movie } = res.locals;
  const movieId = movie.movie_id;
  res.json({ data: await service.listTheaters(movieId) });
}

async function listReviews(req, res, next) {
  const { movie } = res.locals;
  const movieId = movie.movie_id;
  res.json({ data: await service.listReviews(movieId) });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), read],
  listTheaters: [asyncErrorBoundary(movieExists), listTheaters],
  listReviews: [asyncErrorBoundary(movieExists), listReviews],
};