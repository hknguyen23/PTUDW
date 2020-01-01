const express = require("express");
const moment = require('moment');
const model = require("../../models/model");
const router = express.Router({ mergeParams: true });

const UserOnly = require('../../middlewares/UserOnly.mdw');
router.use(express.static("public"));


router.get("/:Id", async(req, res) => {
    //Id = id sản phẩm
    const productId = +req.params.Id;
    let userId = null;
    if (res.locals.authUser !== null)
        userId = res.locals.authUser.ID;

    const [productDetails, image, biddingHistory, relationProduct, favProduct, userScore, hasEverBid] =
    await Promise.all([
        model.getProduct(productId),
        model.getImage(productId),
        model.getBiddingHistory(productId),
        model.getRelation(productId),
        model.getFavorite(userId, productId),
        model.getScore(userId),
        model.countWonListbyID(userId)
    ]);

    if (productDetails.length === 0) // nhập đường dẫn bậy
        return res.redirect('/');

    //mask name in bidding history
    for (let i = 0; i < biddingHistory.length; i++) {
        var username = (biddingHistory[i].tentaikhoan);
        var mask = "****" + username.substring(username.length / 2);
        biddingHistory[i].tentaikhoan = mask;
    }

    let errMsg;
    if (req.session.proView_errMsg !== 'undefined') {
        errMsg = req.session.proView_errMsg;
        delete req.session.proView_errMsg;
    } else errMsg = false;

    res.render("productView", {
        title: "Thông tin sản phẩm",
        css: ["HomeStyle.css", "carousel.css", "ProductView.css"],
        js: ["ProductView.js", "carousel.js"],
        details: productDetails[0],
        biddingHistory,
        image,
        relationProduct,
        isFav: (favProduct.length !== 0) ? 1 : 0,
        userId,
        userScore: userScore[0],
        hasEverBid,
        errMsg
    });
});

router.post("/:Id", UserOnly, async(req, res) => {

    const productId = +req.params.Id;
    const userId = res.locals.authUser.ID;
    const details = await model.getProduct(productId);

    // check again ----------

    if (req.body.price <= details[0].GIA) {
        req.session.proView_errMsg = "Đấu giá thất bại! Giá đặt phải lớn hơn giá hiện tại."
        return res.redirect(req.headers.referer);
    }
    if ((req.body.price - details[0].GIA) % details[0].BUOCGIA !== 0) {
        req.session.proView_errMsg = "Đấu giá thất bại! Giá đặt không đúng bước giá."
        return res.redirect(req.headers.referer);
    }

    const today = moment().format('YYYY-MM-DD HH:mm:ss');
    const endate = moment(details[0].NGAYHETHAN).format("YYYY-MM-DD HH:mm:ss");
    if (today > endate) {
        req.session.proView_errMsg = "Đấu giá thất bại! Sản phẩm đã hết hạn đấu giá"
        return res.redirect(req.headers.referer);
    } //else { console.log("ko dau dc"); }
    // end check ---------------

    var entity1 = {
        idnguoidaugia: userId,
        idsanpham: productId,
        thoigiandaugia: moment().format('YYYY-MM-DD hh:mm:ss'),
        gia: req.body.price
    };
    const solanduocdaugia = details[0].SOLAN + 1;
    const giamuangay = details[0].GIAMUANGAY;
    var entity2 = {
        idsanpham: entity1.idsanpham,
        gia: entity1.gia,
        solanduocdaugia
    };
    if (giamuangay !== null) {
        if (entity1.gia >= giamuangay) // nếu giá đặt lớn hơn giá hiện tại
            entity2.idnguoithangdaugia = userId;
    }
    const [addResult, update] = await Promise.all([
        model.addBidDetail(entity1),
        model.updateProduct(entity2) // gửi vào 1 entity khác chỉ có 2 trường là idsp và giá
    ]);
    res.redirect(req.headers.referer);
});
module.exports = router;