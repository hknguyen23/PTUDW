const express = require("express");
const model = require("../../models/model");
const router = express.Router();
router.use(express.static("public"));

router.get("/", async(req, res) => {
    const rows = await model.getAllUsers();
	
	for (const row of rows) {
		if (row.Loai === 1) {
			row.isBidder = true;
		}
		else if (row.Loai === 2) {
			row.isSeller = true;
		}
		else row.isAdmin = true;
    }

    res.render("allUsers", {
        title: "Danh sách toàn bộ người dùng",
        css: ["HomeStyle.css", "AccountStyle.css"],
        js: ["AccountScript.js", "UserView.js"],
		empty: rows.length === 0,
        users: rows
    });
});

module.exports = router;