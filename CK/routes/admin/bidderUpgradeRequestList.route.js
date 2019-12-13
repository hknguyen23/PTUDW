const express = require("express");
const model = require("../../models/model");
const router = express.Router();
router.use(express.static("public"));

router.get("/", async(req, res) => {	
    const rows = await model.getBidderUpgradeRequest();
	
    res.render("bidderList", {
        title: "Danh sách các Bidder xin nâng cấp thành Seller",
        css: ["HomeStyle.css", "AccountStyle.css"],
        js: ["AccountScript.js"],
		empty: rows.length === 0,
        list: rows,
    });
});

module.exports = router;