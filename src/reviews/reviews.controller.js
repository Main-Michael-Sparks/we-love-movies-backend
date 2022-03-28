const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reviews.service");


// validate review id
async function validateReviewId(req, res, next) {

    res.locals.reviewId = Number(req.params.reviewId);

    if (res.locals.reviewId){
        res.locals.databaseRes = await service.read(res.locals.reviewId);
    };

    if (res.locals.databaseRes) {
        return next();
    };

    next({ status: 404, message: 'Review cannot be found.' });
};

// call db and delete the requested review
async function destory(_req, res, _next) {

    await service.delete(res.locals.reviewId);
    res.sendStatus(204);

};

module.exports = {
    delete: [asyncErrorBoundary(validateReviewId),asyncErrorBoundary(destory)]
};