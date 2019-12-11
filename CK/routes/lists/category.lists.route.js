const express = require('express');
const productModel = require('../../models/model');

const router = express.Router();
router.use(express.static("public"));

router.get('/:id', async (req, res) => {
    const rows = await productModel.getProductByCat(req.params.id);
    const category = await productModel.getCategories();
    if (rows.length === 0){
        pTitle = 'Not Found'
    }
    else{
        pTitle = rows[0].TenLoai;
    }
    res.render("productList", {
        title: "Category",
        css: ["List.css"],
        js: ["List.js"],
        products: rows,
        categories: category,
        empty: rows.length === 0,
        pageTitle: pTitle,
    });
})

module.exports = router;