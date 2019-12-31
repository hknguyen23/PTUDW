const express = require("express");
const model = require("../../models/model");
const router = express.Router();
router.use(express.static("public"));

router.get("/:id", async(req, res) => {
	const userID = +req.params.id;
	
    const result = await model.getUserById(userID);
	
	for (const row of result) {
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
		empty: result.length === 0,
        info: result
    });
});

module.exports = router;