const hbs = require("hbs");
const fs = require("fs");
const puppeteer = require("puppeteer");
const path = require("path");

let { registerPartials } = require("./helpers/helpers");

const main = path.join(__dirname, "views/layout.hbs");

const response = require("./utils/data.json");

const generatePDF = async (data) => {
  try {
    const options = {
      printBackground: true,
      height: "1256",
    };
    // bstReportDataProcessor(data);
    console.log("Registering the partials");
    registerPartials();

    // console.log("Registering the helpers");
    // registerBDTHelpers();
    // console.log("Generating the template");

    const bstTemplate = fs.readFileSync(main, "utf-8");
    const template = hbs.handlebars.compile(bstTemplate);
    console.log("Compiled the template");
    const html = template({
      ...data,
    });

    const browser = await puppeteer.launch({
      defaultViewport: { width: 1280, height: 800 },
      ignoreHTTPSErrors: true,
    });
    var page = await browser.newPage();
    await page.setContent(html);
    const pdfReport = await page.pdf(options);
    fs.writeFileSync(`../${data.name}.pdf`, pdfReport);
    browser.close();
    return data.name;
  } catch (err) {
    return err;
  }
};

generatePDF(response)
  .then((data) => {
    console.log("Success", data);
  })
  .catch((err) => {
    console.log("Something went wrong", err);
  });
