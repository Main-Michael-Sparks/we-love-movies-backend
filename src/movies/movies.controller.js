const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./movies.service");

async function list(req, res, _next){
    const isMovieShowing = req.query.is_showing
    res.json({ data: await service.list(isMovieShowing?isMovieShowing:null)})
};


module.exports = {
    list: [asyncErrorBoundary(list)],
}