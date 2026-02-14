const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (err.name === 'CastError') {
        return res.status(400).send({error: 'malformed id'});
    }
    next(err)
}
module.exports = errorHandler;