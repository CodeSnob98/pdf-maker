const hbs = require("hbs");
const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
let { registerPartials } = require("./helpers/helpers");
const response = require("./utils/data.json");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "stylessheets")));

app.get("/pdf", (req, res) => {
  const main = path.join(__dirname, "views/layout.hbs");

  console.log("Registering the partials");
  registerPartials();

  // console.log("Registering the helpers");
  // registerBDTHelpers();
  // console.log("Generating the template");

  const bstTemplate = fs.readFileSync(main, "utf-8");
  const template = hbs.handlebars.compile(bstTemplate);
  console.log("Compiled the template");
  const html = template({
    ...response,
  });
  res.send(html);
});

app.listen(3000, () => {
  console.log("Successfully started the server");
});

module.exports = app;
