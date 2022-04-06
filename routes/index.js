var express = require("express");
var router = express.Router();
const bstReportData = require("../utils/data.json");

/* GET home page. */
router.get("/", function (req, res, next) {
  bstReportData.aptitude_analysis.forEach(ele => {
  
    //!!!!important!!!!
    /*if a percentile value has to be shown through the {{>indicator}} that value has to be processed and we have to make a new object
    with the properties --
    {
      deg : it sets the angle of rotation of the arrow,
      val : it is the percentile value we have to show,
      background : it is the background of the solid circle of the indicator (source : figma),
      bar_color : it is the progress bar color (source : figma),
      arrow_color : it is the lighter color of the background of the solid circle (source : figma)
    }
    and add the new object with the values as a property of the parent object 
    and wrap the new object around the {{>indicator}} while using it
    */

    ele.overall_percentile_params={
      deg : Math.round(-144 + 2.88 * ele.overall_percentile),
      val : ele.overall_percentile,
      background : "linear-gradient(161.55deg, #FFA6DF 10.53%, #FF63B8 89.55%)",
      bar_color : "#FF74C2",
      arrow_color : "#FFA6DF"
    }
    ele.state_percentile_params={
      deg : Math.round(-144 + 2.88 * ele.state_percentile),
      val : ele.state_percentile,
      background : "linear-gradient(161.55deg, #00FFDD 10.53%, #03B9CF 89.55%)",
      bar_color : "#02D0D4",
      arrow_color : "#00FFDD"
    }
    ele.city_percentile_params={
      deg : Math.round(-144 + 2.88 * ele.city_percentile),
      val : ele.city_percentile,
      background : "linear-gradient(161.55deg, #F69036 10.55%, #F05F77 89.57%)",
      bar_color : "#F16471",
      arrow_color : "#F69036"
    }
  });


  res.render("index", {
      ...bstReportData
  });

  
});

module.exports = router;
