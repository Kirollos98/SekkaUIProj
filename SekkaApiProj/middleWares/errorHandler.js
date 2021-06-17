module.exports = (err, req, res, next) => {
    res.statusCode = err.statusCode;
    res.send(err.message);
  }