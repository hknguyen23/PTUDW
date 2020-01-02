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
		
		if (row.NgaySinh != null){
			row.NgaySinh = moment(row.NgaySinh).format('DD/MM/YYYY');
		}
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
		
		if (row.NgaySinh != null){
			row.NgaySinh = moment(row.NgaySinh).format('DD/MM/YYYY');
		}
	}

    res.render("accountManagement", {
        title: "Quản lý thông tin cá nhân",
        css: ["HomeStyle.css", "AccountStyle.css"],
        js: ["AccountScript.js", "AccountView.js"],
		empty: info.length === 0,
		info,
	});
});

router.get("/modify", async(req, res) => {
	const userID = res.locals.authUser.ID;	
	const info = await model.getUserById(userID);

	if (info[0].Loai === 1) {
		info[0].isBidder = true;
	}
	else if (info[0].Loai === 2) {
		info[0].isSeller = true;
	}
	else info[0].isAdmin = true;
	
	if (info[0].NgaySinh != null){
		info[0].NgaySinh = moment(info[0].NgaySinh).format('DD/MM/YYYY');
	}

	var pos = info[0].HoTen.lastIndexOf(" ");
	var lastName = info[0].HoTen.substring(pos + 1);
	var firstName = info[0].HoTen.substring(0, pos);

    res.render("changeInfo", {
        title: "Thay đổi thông tin cá nhân",
        css: ["HomeStyle.css", "AccountStyle.css"],
		js: ["AccountScript.js", "AccountView.js"],
		empty: info.length === 0,
		info,
		lastName,
		firstName,
		errors: req.session.errors,
	});
	req.session.errors = null;
});
router.post("/modify" ,async (req, res) => {
	
	const entity = req.body;

	entity.HoTen = req.body.firstName + " " + req.body.lastName;
	entity.NgaySinh = moment(req.body.NgaySinh, 'DD/MM/YYYY').format('YYYY/MM/DD');
	delete entity.firstName;
	delete entity.lastName;


	await model.updateNguoiDung(entity);
	res.redirect('/accountManagement');
    
});
module.exports = router;