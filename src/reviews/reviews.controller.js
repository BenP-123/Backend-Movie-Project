const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const review = await service.read(reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  return next({ status: 404, message: `Review cannot be found.` });
}

async function read(req, res, next) {
  const knexInstance = req.app.get("db");
  const { review } = res.locals;
  res.json({ data: review });
}

async function update(req, res) {
    const updatedReview = {
        ...response.locals.review,
        ...request.body.data,
        review_id: response.locals.review.review_id,
      };
      const data = await service.update(updatedReview);
    res.json({ data });
  }

async function destroy(req, res) {
    await service.delete(res.locals.review.review_id);
    res.sendStatus(204);
  }

module.exports = {
  destroy: [asyncErrorBoundary(reviewExists), destroy],
  read: [asyncErrorBoundary(reviewExists), read],
  update: [asyncErrorBoundary(reviewExists), update],
};