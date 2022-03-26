// default generic 500 server error handler

function errorHandler(error, _req, res, _next){
    const { status = 500, message = "Something went wrong.." } = error;
    res.status(status).json({ error: message });
};

module.exports = errorHandler;