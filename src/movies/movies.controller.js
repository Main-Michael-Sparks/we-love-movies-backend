const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./movies.service");

// is_showing query validator
function validateIsShowingQuery(req, res, next){
    if (req.query.is_showing === undefined) {
        return next();
    };

    if (req.query.is_showing === "true"){
        res.locals.is_showing = true;
       return next();
    };

    next({
        status: 400,
        message: `invalid query: ${req.query.is_showing}`
    });
};

// movie_id validator; id stored in locals for use in other functions
async function validateMovieId(req, res, next) {
    res.locals.movieId = Number(req.params.movieId);
    if (res.locals.movieId){
        res.locals.movie = await service.read(res.locals.movieId);
    };

    if (res.locals.movie) {
       return next();
    };

    next({ status: 404, message: 'Movie cannot be found.' })
};

async function read(_req, res, _next) {

    res.json({ data: res.locals.movie })
}

async function list(_req, res, _next){
    res.json({ 
        data: await service.list(res.locals.is_showing?res.locals.is_showing:null) 
    });
};

module.exports = {
    list: [validateIsShowingQuery,asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(validateMovieId),asyncErrorBoundary(read)]
}