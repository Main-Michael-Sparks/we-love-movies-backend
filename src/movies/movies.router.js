const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");


// route handler for /movies?is_showing
router.route("/:movies?")
.get(controller.list)
.all(methodNotAllowed)

// route handler for /movies
router.route("/")
    .get(controller.list)
    .all(methodNotAllowed)

module.exports = router; 