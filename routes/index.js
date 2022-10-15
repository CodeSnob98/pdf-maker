var express = require("express");
var router = express.Router();
const data = require("../utils/data.json");


/* GET home page. */
router.get("/", function (req, res, next) {
  
  res.render("index", {
      ...data
  });

  
});

module.exports = router;
