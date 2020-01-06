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
    // Check if voted user exists
    const user = await model.getUserById(req.body.IDNguoiDuocDanhGia);
    if (res.locals.isAuthenticated && user.length > 0) {
        const entity = {
            IDSanPham: req.body.IDSanPham,
            IDNguoiDanhGia: res.locals.authUser.ID,
            IDNguoiDuocDanhGia: req.body.IDNguoiDuocDanhGia
        }        
        const id = await model.findRating(entity);


        // add, remove in CHITIETDANHGIA table
        if (id.length > 0) {                        
            await model.delRating(entity);
        } 
        if (req.body.DiemDanhGia != 0) {            // only add when rating = 1 or -1
            entity.ThoiGianDanhGia = moment().format("YYYY-MM-DD HH:mm:ss");
            entity.DiemDanhGia = req.body.DiemDanhGia;
            entity.NhanXet = req.body.NhanXet;    
            await model.addRating(entity); 
        }

        // update score
        score = await model.getScoreById(entity.IDNguoiDuocDanhGia)
        console.log(score)

        if (score.length == 2) {
            var updateScore = 0;                    // avoid / by zero
            if (score[1].score != 0 || score[0].score != 0) {
                var updateScore = Math.ceil(score[0].score/ (score[1].score + score[0].score) * 100)      // plus/all * 100
            }

            const entity2 = {
                id: req.body.IDNguoiDuocDanhGia,
                TongDiemDanhGia: updateScore
            }    
            console.log(entity2)
            await model.updateNguoiDung(entity2);
        }
    }
});
module.exports = router;