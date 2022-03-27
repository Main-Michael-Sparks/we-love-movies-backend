const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");


// route handler for /movies/:movieId/theaters
router.route("/:movieId/theaters")
    .get(controller.read)
    .all(methodNotAllowed);

// route handler for /movies/:movieId
router.route("/:movieId")
    .get(controller.read)
    .all(methodNotAllowed);

// route handler for /movies?is_showing
router.route("/:movies?")
    .get(controller.list)
    .all(methodNotAllowed);

// route handler for /movies
router.route("/")
    .get(controller.list)
    .all(methodNotAllowed);

module.exports = router; 