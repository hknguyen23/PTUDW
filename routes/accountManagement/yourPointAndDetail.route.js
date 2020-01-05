const express = require("express");
const model = require("../../models/model");
const router = express.Router();
router.use(express.static("public"));

router.get("/", async(req, res) => {
	const userID = res.locals.authUser.ID;	
	
    const [rows, point, info] = await Promise.all([
		model.getYourPointAndDetail(userID),
		model.getPointByID(userID),
		model.getUserById(userID)
	]);
	
	for (const row of info) {
		if (row.Loai === 1) {
			row.isBidder = true;
		}
		else if (row.Loai === 2) {
			row.isSeller = true;
		}
		else row.isAdmin = true;
	}
	
    res.render("yourPointAndDetail", {
        title: "Tổng điểm đánh giá và chi tiết các lần được đánh giá",
        css: ["HomeStyle.css", "AccountStyle.css"],
        js: ["AccountScript.js"],
		empty: rows.length === 0,
        details: rows,
		point,
		info
    });
});
module.exports = router;