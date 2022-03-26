const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./movies.service");

async function list(req, res, next){
    const allMoives = await service.list();
    res.json({data: allMoives})
};


module.exports = {
    list: [asyncErrorBoundary(list)],
}