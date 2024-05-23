function notFound(req, res, next) {
    res.status(404).json({ error: `Path not found: ${req.originalUrl}` });
  }
  
  module.exports = notFound;