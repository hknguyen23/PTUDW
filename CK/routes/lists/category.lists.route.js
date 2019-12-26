const express = require('express');
const model = require('../../models/model');
const config = require('../../config/default.json');

const router = express.Router();
router.use(express.static("public"));

router.get('/:id', async (req, res) => {
    // page
    const limit = config.paginate.limit;

    const page = req.query.page || 1;
    if (page < 1) page = 1;
    const offset = (page - 1) * config.paginate.limit;
  
    // get data
    var idND = -1;
    if (res.locals.isAuthenticated){
        idND = res.locals.authUser.ID;
    }
    const [total, rows, catLV1, catLV2] = await Promise.all([
        model.countProductByCat(req.params.id),
        model.getProductByCat(req.params.id, idND, offset),
        model.getCategoriesLV1(),
        model.getCategoriesLV2(),
    ]);
    console.log(rows);

    // calculate page number
    var maxPages = Math.floor(total / limit);

    if (total % limit > 0) maxPages++;
    const page_numbers = [];
    for (i = 1; i <= maxPages; i++) {
        page_numbers.push({
        value: i,
        })
    }
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
        catLV1,
        catLV2,
        empty: rows.length === 0,
        pageTitle: pTitle,
        page_numbers,
        prev_value: +page - 1,
        next_value: +page + 1,    
        page,
        maxPages,
    });
})

module.exports = router;