const express = require('express');
const model = require('../../models/model');
const config = require('../../config/default.json');

const router = express.Router();
router.use(express.static('public'));

router.get('/watch', async (req, res) => {
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
    const [total, rows] = await Promise.all([
        model.countWatchListbyID(idND),
        model.getWatchListbyID(idND, offset),
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

router.get('/ongoing', async (req, res) => {
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
    const [total, rows] = await Promise.all([
        model.countOngoingListbyID(idND),
        model.getOngoingListbyID(idND, offset),
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
router.get('/won', async (req, res) => {
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
    const [total, rows] = await Promise.all([
        model.countWonListbyID(idND),
        model.getWonListbyID(idND, offset),
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

router.get('/upload', async (req, res) => {
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
    const [total, rows] = await Promise.all([
        model.countUploadListbyID(idND),
        model.getUploadListbyID(idND, offset),
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

router.get('/sold', async (req, res) => {
    // page
    const limit = config.paginate.limit;

    const page = req.query.page || 1;
    if (page < 1) page = 1;
    const offset = (page - 1) * config.paginate.limit;

    // get data
    if (res.locals.isAuthenticated){
        idND = res.locals.authUser.ID;
    }
    const [total, rows] = await Promise.all([
        model.countSoldListbyID(idND),
        model.getSoldListbyID(idND, offset),
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