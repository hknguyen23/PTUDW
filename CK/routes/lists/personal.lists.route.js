const express = require('express');
const productModel = require('../../models/model');

const router = express.Router();
router.use('/:id', express.static('public'));

router.get('/:id/watch', async (req, res) => {
    const rows = await productModel.getWatchListbyID(req.params.id);
    res.render("personalList", {
        title: "Theo dõi",
        css: ["List.css"],
        js: ["List.js"],
        products: rows,
        empty: rows.length === 0,
        pageTitle: "Theo dõi",
    });
})

router.get('/:id/ongoing', async (req, res) => {
    const rows = await productModel.getWatchListbyID(req.params.id);
    res.render("personalList", {
        title: "Sản phẩm đang đấu giá",
        css: ["List.css"],
        js: ["List.js"],
        products: rows,
        empty: rows.length === 0,
        pageTitle: "Đang diễn ra",
    });
})
router.get('/:id/won', async (req, res) => {
    const rows = await productModel.getWatchListbyID(req.params.id);
    res.render("personalList", {
        title: "Sản phẩm đã thắng",
        css: ["List.css"],
        js: ["List.js"],
        products: rows,
        empty: rows.length === 0,
        pageTitle: "Đã thắng",
    });
})

router.get('/:id/upload', async (req, res) => {
    const rows = await productModel.getWatchListbyID(req.params.id);
    res.render("personalList", {
        title: "Sản phẩm đã đăng",
        css: ["List.css"],
        js: ["List.js"],
        products: rows,
        empty: rows.length === 0,
        pageTitle: "Đã đăng",
    });
})

router.get('/:id/sold', async (req, res) => {
    const rows = await productModel.getWatchListbyID(req.params.id);
    res.render("personalList", {
        title: "Sản phẩm đã bán",
        css: ["List.css"],
        js: ["List.js"],
        products: rows,
        empty: rows.length === 0,
        pageTitle: "Đã đăng",
    });
})


module.exports = router;