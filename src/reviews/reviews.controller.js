const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reviews.service");

// validate review id
async function validateReviewId(req, res, next) {

    res.locals.reviewId = Number(req.params.reviewId);

    if (res.locals.reviewId){
        res.locals.databaseRes = await service.read(res.locals.reviewId);
    };

    if (res.locals.databaseRes) {
        res.locals.databaseRes = {}; // clear the databaseRes var for reassignment. 
        return next();
    };

    next({ status: 404, message: 'Review cannot be found.' });
};

// validate update object
function validateUpdateObject(req, res, next) {

    res.locals.updateObj = {};
    res.locals.updateObj.review_id = res.locals.reviewId;

    if(req.body.data.score && req.body.data.content){
        res.locals.updateObj = {
            "score": req.body.data.score,
            "content": req.body.data.content
        };
       return next();
    };

    if(req.body.data.score){ 
        res.locals.updateObj.score = req.body.data.score;
       return  next();
    };
    
    if(req.body.data.content){
        res.locals.updateObj.content = req.body.data.content;
       return next(); 
    } 

    next({status: 400, message: "Must provide something to update.."});
};

// call the db; update, and return a reformatted res
async function update(_req, res, _next){

    await service.update(res.locals.updateObj);
    const intialDbRes = await service.read(res.locals.updateObj.review_id, "put");

    res.locals.databaseRes = {
        content: intialDbRes[0].content,
        created_at: intialDbRes[0].created_at,
        critic: {
            organization_name: intialDbRes[0].organization_name,
            preferred_name: intialDbRes[0].preferred_name,
            surname: intialDbRes[0].surname,
        },
        critic_id: intialDbRes[0].critic_id,
        movie_id: intialDbRes[0].movie_id,
        review_id: intialDbRes[0].review_id,
        score: intialDbRes[0].score,
        updated_at: intialDbRes[0].updated_at
    };

    res.json({ data: res.locals.databaseRes });
};

// call db and delete the req review
async function destory(_req, res, _next) {

    await service.delete(res.locals.reviewId);
    res.sendStatus(204);

};

module.exports = {
    update: [asyncErrorBoundary(validateReviewId),validateUpdateObject,asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(validateReviewId),asyncErrorBoundary(destory)]
};