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
        res.locals.databaseRes = await service.read(res.locals.movieId, "movie");
    };

    if (res.locals.databaseRes) {
        return next();
    };

    next({ status: 404, message: 'Movie cannot be found.' });
};

async function read(req, res, _next) {

    const path = req.path;
    const theaterRoute = `/${res.locals.movieId}/theaters`;
    const reviewsRoute = `/${res.locals.movieId}/reviews`;
    
    if (path === theaterRoute) {
        res.locals.databaseRes = await service.read(res.locals.movieId, "theaters");
    };

    if (path === reviewsRoute) {
        const initalDatabaseRes = await service.read(res.locals.movieId, "reviews");
        res.locals.databaseRes = initalDatabaseRes.reduce((array, object) =>{
                const reformattedDatabaseRes = {
                    review_id: object.rev_review_id,
                    content: object.rev_content,
                    score: object.rev_score,
                    critic_id: object.critic_id,
                    movie_id: object.rev_movie_id,
                    created_at: object.rev_created_at,
                    updated: object.rev_updated_at,
                    critic: {
                        organization_name: object.cri_organization_name,
                        preferred_name: object.cri_preferred_name,
                        surname: object.cri_surname,
                    }
                };
                array.push(reformattedDatabaseRes);
                return array;
            },[]);
    };

    res.json({  data: res.locals.databaseRes });

};

async function list(_req, res, _next){

    res.json({ 
        data: await service.list(res.locals.is_showing?res.locals.is_showing:null)
    });

};

module.exports = {
    list: [validateIsShowingQuery,asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(validateMovieId),asyncErrorBoundary(read)]
}; 