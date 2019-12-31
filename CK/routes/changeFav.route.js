const express = require('express');
const model = require('../models/model');
const config = require('../config/default.json');

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

module.exports = router;