const { test } = require("../../knexfile");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./theaters.service");

// list all theaters and movies showing at each theater with formatted db res
async function list(_req, res, _next){

    const initalDbRes = await service.list();
    res.locals.databaseRes = service.taileredReducer(initalDbRes);

    res.json({ data: res.locals.databaseRes })

};

module.exports = {
    list: [asyncErrorBoundary(list)]
}