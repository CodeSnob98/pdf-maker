const hbs = require("hbs");
const path = require("path");
const fs = require("fs");

const registerPartials = () => {
  const partialsDir = path.join(__dirname, "../", "views");
  const filenames = fs.readdirSync(partialsDir);
  filenames.forEach((file) => {
    const partialName = file.split(".")[0];
    const template = fs.readFileSync(partialsDir + "/" + file, "utf-8");
    hbs.registerPartial(partialName, template);
  });
};

const registerHelpers = () => {
  //   hbs.registerHelper("formatDate", formatDate);
};

module.exports = {
  //   registerHelpers,
  registerPartials,
};
