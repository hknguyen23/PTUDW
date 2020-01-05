const express = require("express");
const model = require("../../models/model");
const router = express.Router();
router.use(express.static("public"));

router.get("/", async(req, res) => {
    const rows = await model.getAllCategoryLv1WithQuantity();
		
    res.render("categoryLv1", {
        title: "Danh sách danh mục cha",
        css: ["HomeStyle.css", "AccountStyle.css"],
        js: ["AccountScript.js", "CategoryLv1Admin.js"],
		empty: rows.length === 0,
        list: rows,
    });
});

router.post("/save", async(req, res) => {
	console.log(req.body);
	var entity;
	for (i = 0; i < req.body.rowSelected.length; i++){
		entity = {
			ID: req.body.id[req.body.rowSelected[i] - 1],
			TenLoai: req.body.catName[req.body.rowSelected[i] - 1]
		}
		console.log(entity);
	}
	
	const result = await model.updateCatLv1Name(entity);
		
	res.redirect(`/categoryLv1`);
});

router.post("/del", async(req, res) => {
	console.log(req.body);
	var entity;
	for (i = 0; i < req.body.rowSelected.length; i++){
		entity = {
			ID: req.body.id[req.body.rowSelected[i] - 1],
			TenLoai: req.body.catName[req.body.rowSelected[i] - 1]
		}
		console.log(entity);
	}
	
	const result = await model.delCatLv1ById(entity);
		
	res.redirect(`/categoryLv1`);
});

router.post("/add", async(req, res) => {
	console.log(req.body);
	const entity = {
		TenLoai: req.body.newCatName
	}
	console.log(entity);
	const result = await model.addCatLv1(entity);
		
	res.redirect(`/categoryLv1`);
});

module.exports = router;