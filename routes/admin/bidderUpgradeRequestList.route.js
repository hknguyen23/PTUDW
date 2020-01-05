const express = require("express");
const model = require("../../models/model");
const router = express.Router();
const config = require('../../config/default.json');
router.use(express.static("public"));

router.get("/", async(req, res) => {	
	const limit = config.paginate.limit;
    const page = req.query.page || 1;
    if (page < 1) page = 1;
    const offset = (page - 1) * limit;
	
    const [total, rows] = await Promise.all([
		model.countAllBidderRequest(),
		model.getBidderUpgradeRequest(),
	]);
			
	// calculate page number
    var maxPages = Math.floor(total / limit);
    if (total % limit > 0) maxPages++;
    const page_numbers = [];
    for (i = 1; i <= maxPages; i++) {
        page_numbers.push({
			value: i
        })
    }
		
    res.render("bidderList", {
        title: "Danh sách các Bidder xin nâng cấp thành Seller",
        css: ["HomeStyle.css", "AccountStyle.css"],
        js: ["AccountScript.js", "BidderList.js"],
		empty: rows.length === 0,
        list: rows,
		page,
        maxPages,
		prev_value: +page - 1,
		next_value: +page + 1,
		page_numbers
    });
});

router.post("/", async(req, res) => {
	for (i = 0; i < req.body.id.length; i++){
		var type = 2;
		const entity = {
			ID: req.body.id[i],
			Loai: type,
			XinNangCap: false
		}
		console.log(req.body);
		if (req.body.isOK[i] == 1){
			const edit = await model.changeUserInfoById(entity);
		}
	}
	
	res.redirect(`/bidderList`);
});

module.exports = router;