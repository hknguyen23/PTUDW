const express = require("express");
const model = require("../../models/model");
const router = express.Router();
router.use(express.static("public"));

router.get("/", async(req, res) => {
    const rows = await model.getAllCategoryLv1WithQuantity();
		
    res.render("categoryLv1", {
        title: "Danh sách danh mục cha",
        css: ["HomeStyle.css", "AccountStyle.css"],
        js: ["AccountScript.js"],
		empty: rows.length === 0,
        list: rows,
    });
});

router.post("/", async(req, res) => {
	
});

module.exports = router;