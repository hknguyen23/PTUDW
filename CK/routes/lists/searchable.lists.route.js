const express = require('express');
const model = require('../../models/model');
const config = require('../../config/default.json');

const router = express.Router();
router.use(express.static("public"));

router.post('/', async (req, res) => {
    // form
    var key = req.body.key;
    var idLoai = req.body.idLoai || '';
    if (idLoai != ''){
        idLoai = "AND SP.idLoai = " + idLoai;
    }
    var by = req.body.by || 'SP.NgayDang';
    var order = req.body.order || 'DESC';

    // page
    const limit = config.paginate.limit;

    const page = req.query.page || 1;
    if (page < 1) page = 1;
    const offset = (page - 1) * config.paginate.limit;
  
    // get data
    const [total, rows, catLV2] = await Promise.all([
        model.countSearchListbyKey(key, idLoai),
        model.getSearchListbyKey(key, idLoai, by, order, offset),
        model.getCategoriesLV2(),
    ]);

    console.log(total);

    // calculate page number
    var maxPages = Math.floor(total / limit);

    if (total % limit > 0) maxPages++;
    const page_numbers = [];
    for (i = 1; i <= maxPages; i++) {
        page_numbers.push({
        value: i,
        })
    }
    res.render("search", {
        title: "Search page",
        css: ["List.css"],
        js: ["List.js"],
        products: rows,
        catLV2,
        empty: rows.length === 0,
        pageTitle: key,
        page_numbers,
        prev_value: +page - 1,
        next_value: +page + 1,    
        page,
        maxPages,        
        form: req.body,
    });
})

module.exports = router;