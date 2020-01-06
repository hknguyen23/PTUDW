const express = require("express");
const model = require("../../models/model");
const router = express.Router();
router.use(express.static("public"));

router.get("/:id?", async(req, res) => {
	const catLv1ID = +req.params.id || -1;
    const [rows, catLv1, isExist] = await Promise.all([
		model.getAllCategoryLv2ByCategoryLv1ID(catLv1ID),
		model.getAllCategoryLv1(),
		model.isExistCatLv1(catLv1ID)
	]);
		
    res.render("categoryLv2", {
        title: "Danh sách danh mục con",
        css: ["HomeStyle.css", "AccountStyle.css"],
        js: ["AccountScript.js", "CategoryLv2Admin.js"],
		empty: rows.length === 0,
        list: rows,
		catLv1,
		catLv1ID,
		isExist
    });
});

router.post("/:id?/save", async(req, res) => {
	console.log(req.body);
	const entity = {
		ID: req.body.id[req.body.rowSelected - 1],
		TenLoai: req.body.catName[req.body.rowSelected - 1]
	}
	console.log(entity);
	
	const result = await model.updateCatLv2Name(entity);
		
	const catLv1ID = +req.params.id || -1;

	res.redirect(`/categoryLv2/${catLv1ID}`);
});

router.post("/:id?/del", async(req, res) => {
	console.log(req.body);
	const entity = {
		ID: req.body.id[req.body.rowSelected - 1],
		TenLoai: req.body.catName[req.body.rowSelected - 1]
	}
	console.log(entity);
	
	const result = await model.delCatLv2ById(entity);	
	
	const catLv1ID = +req.params.id || -1;
	
	res.redirect(`/categoryLv2/${catLv1ID}`);
});

router.post("/:id?/add", async(req, res) => {
	console.log(req.body);
	const entity = {
		TenLoai: req.body.newCatName,
		IDLoaiCap1: req.body.idLoaiCap1
	}
	console.log(entity);
	
	const result = await model.addCatLv2(entity);
	
	const catLv1ID = +req.params.id || -1;
	
	res.redirect(`/categoryLv2/${catLv1ID}`);
});

module.exports = router;