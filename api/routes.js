const controllers = require("./controllers.js");
const express = require("express");

const router = express.Router();

router.get("/", controllers.hello);

// write your routes
router.get("/books", controllers.getList);

router.get("/books/:id", controllers.getBook);

router.post("/books", controllers.addBook);

router.delete("/books/:id", controllers.removeBook);

module.exports = router;
