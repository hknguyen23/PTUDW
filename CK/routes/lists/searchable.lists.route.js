const express = require('express');
const path = require('path')
const productModel = require('../../models/model');

const router = express.Router();
router.use('/watch', express.static('public'));

router.get('/watch/:id', async (req, res) => {
    /*const rows = await productModel.getProductByCat(req.params.id);
    const category = await productModel.getCategories();
    if (rows.length === 0){
        pTitle = "Not Found"
    }
    else{
        pTitle = "Watch list";
    }*/
    res.render("search", {
        title: "Watch list",
        css: ["List.css"],
        js: ["List.js"],
        //products: rows,
        //categories: category,
        //pageTitle: pTitle,
    });
})

module.exports = router;