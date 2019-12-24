const express = require('express');
const model = require('../../models/model');
const config = require('../../config/default.json');

const router = express.Router();
router.use('/:id', express.static('public'));

router.get('/:id/watch', async (req, res) => {
    // page
    const limit = config.paginate.limit;

    const page = req.query.page || 1;
    if (page < 1) page = 1;
    const offset = (page - 1) * config.paginate.limit;

    // get data
    const [total, rows] = await Promise.all([
        model.countWatchListbyID(req.params.id),
        model.getWatchListbyID(req.params.id, offset),
    ]);

    // calculate page number
    var maxPages = Math.floor(total / limit);

    if (total % limit > 0) maxPages++;
    const page_numbers = [];
    for (i = 1; i <= maxPages; i++) {
        page_numbers.push({
        value: i,
        })
    }

    res.render("personalList", {
        title: "Theo dõi",
        css: ["List.css"],
        js: ["List.js"],
        products: rows,
        empty: rows.length === 0,
        pageTitle: "Theo dõi",
        page_numbers,
        prev_value: +page - 1,
        next_value: +page + 1,    
        page,
        maxPages,
    });
})

router.get('/:id/ongoing', async (req, res) => {
    // page
    const limit = config.paginate.limit;

    const page = req.query.page || 1;
    if (page < 1) page = 1;
    const offset = (page - 1) * config.paginate.limit;

    // get data
    const [total, rows] = await Promise.all([
        model.countOngoingListbyID(req.params.id),
        model.getOngoingListbyID(req.params.id, offset),
    ]);

    // calculate page number
    var maxPages = Math.floor(total / limit);

    if (total % limit > 0) maxPages++;
    const page_numbers = [];
    for (i = 1; i <= maxPages; i++) {
        page_numbers.push({
        value: i,
        })
    }

    res.render("personalList", {
        title: "Sản phẩm đang đấu giá",
        css: ["List.css"],
        js: ["List.js"],
        products: rows,
        empty: rows.length === 0,
        pageTitle: "Đang diễn ra",
        page_numbers,
        prev_value: +page - 1,
        next_value: +page + 1,    
        page,
        maxPages,
    });
})
router.get('/:id/won', async (req, res) => {
    // page
    const limit = config.paginate.limit;

    const page = req.query.page || 1;
    if (page < 1) page = 1;
    const offset = (page - 1) * config.paginate.limit;

    // get data
    const [total, rows] = await Promise.all([
        model.countWonListbyID(req.params.id),
        model.getWonListbyID(req.params.id, offset),
    ]);

    // calculate page number
    var maxPages = Math.floor(total / limit);

    if (total % limit > 0) maxPages++;
    const page_numbers = [];
    for (i = 1; i <= maxPages; i++) {
        page_numbers.push({
        value: i,
        })
    }

    res.render("personalList", {
        title: "Sản phẩm đã thắng",
        css: ["List.css"],
        js: ["List.js"],
        products: rows,
        empty: rows.length === 0,
        pageTitle: "Đã thắng",
        page_numbers,
        prev_value: +page - 1,
        next_value: +page + 1,    
        page,
        maxPages,
    });
})

router.get('/:id/upload', async (req, res) => {
    // page
    const limit = config.paginate.limit;

    const page = req.query.page || 1;
    if (page < 1) page = 1;
    const offset = (page - 1) * config.paginate.limit;

    // get data
    const [total, rows] = await Promise.all([
        model.countUploadListbyID(req.params.id),
        model.getUploadListbyID(req.params.id, offset),
    ]);

    // calculate page number
    var maxPages = Math.floor(total / limit);

    if (total % limit > 0) maxPages++;
    const page_numbers = [];
    for (i = 1; i <= maxPages; i++) {
        page_numbers.push({
        value: i,
        })
    }

    res.render("personalList", {
        title: "Sản phẩm đã đăng",
        css: ["List.css"],
        js: ["List.js"],
        products: rows,
        empty: rows.length === 0,
        pageTitle: "Đã đăng",
        page_numbers,
        prev_value: +page - 1,
        next_value: +page + 1,    
        page,
        maxPages,
    });
})

router.get('/:id/sold', async (req, res) => {
    // page
    const limit = config.paginate.limit;

    const page = req.query.page || 1;
    if (page < 1) page = 1;
    const offset = (page - 1) * config.paginate.limit;

    // get data
    const [total, rows] = await Promise.all([
        model.countSoldListbyID(req.params.id),
        model.getSoldListbyID(req.params.id, offset),
    ]);

    // calculate page number
    var maxPages = Math.floor(total / limit);

    if (total % limit > 0) maxPages++;
    const page_numbers = [];
    for (i = 1; i <= maxPages; i++) {
        page_numbers.push({
        value: i,
        })
    }

    res.render("personalList", {
        title: "Sản phẩm đã bán",
        css: ["List.css"],
        js: ["List.js"],
        products: rows,
        empty: rows.length === 0,
        pageTitle: "Đã bán",
        page_numbers,
        prev_value: +page - 1,
        next_value: +page + 1,    
        page,
        maxPages,
    });
})


module.exports = router;