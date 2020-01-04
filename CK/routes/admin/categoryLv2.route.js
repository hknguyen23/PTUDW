const express = require("express");
const model = require("../../models/model");
const router = express.Router();
router.use(express.static("public"));

router.get("/", async(req, res) => {
	const catLv1ID = +req.query.id;
    const [rows, catLv1] = await Promise.all([
		model.getAllCategoryLv2ByCategoryLv1ID(catLv1ID),
		model.getAllCategoryLv1()
	]);
		
    res.render("categoryLv2", {
        title: "Danh sách danh mục con",
        css: ["HomeStyle.css", "AccountStyle.css"],
        js: ["AccountScript.js"],
		empty: rows.length === 0,
        list: rows,
		catLv1
    });
});

router.post("/", async(req, res) => {
	
});

module.exports = router;