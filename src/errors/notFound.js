// defeault generic 404 not found error handler

function notFound(req, _res, next) {
    next({ status: 404, message: `path not found: ${req.originalUrl}` });
};

module.exports = notFound;