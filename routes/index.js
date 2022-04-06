var express = require("express");
var router = express.Router();
const bstReportData = require("../utils/data.json");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
      ...bstReportData
  });
});

module.exports = router;
