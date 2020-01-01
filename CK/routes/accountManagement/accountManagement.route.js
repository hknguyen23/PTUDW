const express = require("express");
const model = require("../../models/model");
const moment = require('moment');
const router = express.Router();
router.use(express.static("public"));

router.get("/", async(req, res) => {
	const userID = res.locals.authUser.ID;	
    const info = await model.getUserById(userID);
	
	for (const row of info) {
		if (row.Loai === 1) {
			row.isBidder = true;
		}
		else if (row.Loai === 2) {
			row.isSeller = true;
		}
		else row.isAdmin = true;
		
		row.NgaySinh = moment(row.NgaySinh).format('DD/MM/YYYY');
	}

    res.render("accountManagement", {
        title: "Quản lý thông tin cá nhân",
        css: ["HomeStyle.css", "AccountStyle.css"],
        js: ["AccountScript.js", "AccountView.js"],
		empty: info.length === 0,
        info
    });
});

router.post("/", async(req, res) => {
	const userID = res.locals.authUser.ID;	
	const entity = {
		ID: userID,
		XinNangCap: true
	}
	console.log(entity);
	const result = await model.changeUserInfoById(entity);
	
	const info = await model.getUserById(userID);
	
	for (const row of info) {
		if (row.Loai === 1) {
			row.isBidder = true;
		}
		else if (row.Loai === 2) {
			row.isSeller = true;
		}
		else row.isAdmin = true;
		
		row.NgaySinh = moment(row.NgaySinh).format('DD/MM/YYYY');
	}

    res.render("accountManagement", {
        title: "Quản lý thông tin cá nhân",
        css: ["HomeStyle.css", "AccountStyle.css"],
        js: ["AccountScript.js", "AccountView.js"],
		empty: info.length === 0,
        info
    });
});

module.exports = router;