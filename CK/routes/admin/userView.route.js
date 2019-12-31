const express = require("express");
const model = require("../../models/model");
const moment = require('moment');
const router = express.Router();
const config = require('../../config/default.json');
router.use(express.static("public"));

router.get("/", async(req, res) => {
    const limit = config.paginate.limit;
    const page = req.query.page || 1;
    if (page < 1) page = 1;
    const offset = (page - 1) * limit;
	
    const [total, rows] = await Promise.all([
		model.countAllUsers(),
		model.getAllUsers(offset)
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
	
	for (const row of rows) {
		if (row.Loai === 1) {
			row.isBidder = true;
		}
		else if (row.Loai === 2) {
			row.isSeller = true;
		}
		else row.isAdmin = true;
		
		row.NgaySinh = moment(row.NgaySinh).format('DD/MM/YYYY');
    }
	
    res.render("allUsers", {
        title: "Danh sách toàn bộ người dùng",
        css: ["HomeStyle.css", "AccountStyle.css"],
        js: ["AccountScript.js", "UserView.js"],
		empty: rows.length === 0,
        users: rows,
		page,
        maxPages,
		prev_value: +page - 1,
		next_value: +page + 1,
		page_numbers
    });
});

router.post("/", async(req, res) => {
	const limit = config.paginate.limit;
	for (i = 0; i < limit; i++){
		var type = 3;
		if (req.body.type[i] == "Bidder") type = 1;
		else if (req.body.type[i] == "Seller") type = 2;
		const entity = {
			ID: req.body.id[i],
			Loai: type
		}
		console.log(req.body);
		if (req.body.isDelete[i] == 1){
			const result = await model.deleteUser(entity);
		}
		else {
			const result = await model.changeUserInfoById(entity);
		}
	}
	
    const page = req.query.page || 1;
    if (page < 1) page = 1;
    const offset = (page - 1) * limit;
	
    const [total, rows] = await Promise.all([
		model.countAllUsers(),
		model.getAllUsers(offset)
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
	
	for (const row of rows) {
		if (row.Loai === 1) {
			row.isBidder = true;
		}
		else if (row.Loai === 2) {
			row.isSeller = true;
		}
		else row.isAdmin = true;
		
		row.NgaySinh = moment(row.NgaySinh).format('DD/MM/YYYY');
    }
	
    res.render("allUsers", {
        title: "Danh sách toàn bộ người dùng",
        css: ["HomeStyle.css", "AccountStyle.css"],
        js: ["AccountScript.js", "UserView.js"],
		empty: rows.length === 0,
        users: rows,
		page,
        maxPages,
		prev_value: +page - 1,
		next_value: +page + 1,
		page_numbers
    });
});

module.exports = router;