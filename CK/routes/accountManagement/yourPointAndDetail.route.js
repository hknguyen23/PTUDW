const express = require("express");
const model = require("../../models/model");
const router = express.Router();
router.use(express.static("public"));

router.get("/:id", async(req, res) => {
	const userID = +req.params.id;
	
    const [rows, point] = await Promise.all([
		model.getYourPointAndDetail(userID),
		model.getPointByID(userID)
	]);
	
    res.render("yourPointAndDetail", {
        title: "Tổng điểm đánh giá và chi tiết các lần được đánh giá",
        css: ["HomeStyle.css", "AccountStyle.css"],
        js: ["AccountScript.js"],
		empty: rows.length === 0,
        details: rows,
		point
    });
});

module.exports = router;