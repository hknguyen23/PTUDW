const express = require('express');
const model = require('../models/model');
const config = require('../config/default.json');
const moment = require('moment');

const router = express.Router();

router.post('/changeFav', async(req, res) => {
    if (res.locals.isAuthenticated) {
        const entity = {
            IDSanPham: req.body.IDSanPham,
            IDNguoiDung: res.locals.authUser.ID
        }
        console.log(req.body);
        if (req.body.isFavorite == 1) {
            const result = await model.delFav(entity);
        } else {
            const result = await model.addFav(entity);
        }
    }
});

router.post('/rating', async(req, res) => {
    if (res.locals.isAuthenticated) {
        const entity = {
            IDSanPham: req.body.IDSanPham,
            IDNguoiDanhGia: res.locals.authUser.ID,
            IDNguoiDuocDanhGia: req.body.IDNguoiDuocDanhGia
        }        
        const id = await model.findRating(entity);


        console.log(req.body);
        if (id.length > 0) {                        
            await model.delRating(entity);
        } 
        if (req.body.DiemDanhGia != 0) {            // only add when rating != 0
            entity.ThoiGianDanhGia = moment().format("YYYY-MM-DD HH:mm:ss");
            entity.DiemDanhGia = req.body.DiemDanhGia;
            entity.NhanXet = req.body.NhanXet;    
            await model.addRating(entity);
        }

    }
});
module.exports = router;