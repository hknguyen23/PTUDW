const express = require('express');
const productModel = require('../../models/model');

const router = express.Router();
router.use(express.static("public"));

router.get('/:id', async (req, res) => {

    const rows = await productModel.getProductByCat(req.params.id);
    const category = await productModel.getCategories();
    res.render("productList", {
        title: "Category",
        css: ["List.css"],
        js: ["List.js"],
        products: rows,
        categories: category,
        empty: rows.length === 0
    });
})

module.exports = router;