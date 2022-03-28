const router = require("express").Router();
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// route handler for /reviews/:reviewId
router.route("/:reviewId")
    .delete(controller.delete)
    .all(methodNotAllowed);

module.exports = router;
