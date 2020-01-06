const express = require("express");
const moment = require('moment');
const model = require("../../models/model");
const date = require("date-and-time");
const router = express.Router({ mergeParams: true });
const SellerOnly = require('../../middlewares/SellerOnly.mdw');
const UserOnly = require('../../middlewares/UserOnly.mdw');
const AdminOnly = require('../../middlewares/AdminOnly.mdw')
const emailserver = require('../../middlewares/email.mdw');

router.use('/:Id', express.static("public"));

router.get("/:Id", async(req, res) => {
    //Id = id sản phẩm
    const productId = +req.params.Id;
    let userId = null;
    if (res.locals.authUser !== null) {
        userId = res.locals.authUser.ID;
        if (res.locals.authUser.Loai === 3)
            res.locals.isAdmin = true;
        else res.locals.isAdmin = false;
    }


    const [productDetails, image, biddingHistory, relationProduct, favProduct, userScore, hasEverBid, isBanned] = //hasEverBid <=> has this User win anny items?
    await Promise.all([
        model.getProduct(productId),
        model.getImage(productId),
        model.getBiddingHistory(productId),
        model.getRelation(productId),
        model.getFavorite(userId, productId),
        model.getScore(userId),
        model.countWonListbyID(userId),
        model.checkIsBanned(productId, userId)
    ]);

    if (productDetails.length === 0) // nhập đường dẫn bậy
        return res.redirect('/');

    if (userId === productDetails[0].IDNGUOIBAN)
        res.locals.ownedByThisUser = true; // tạo biến này lưu trong res.locals để bên view xài
    else res.locals.ownedByThisUser = false;


    //mask name in bidding history
    for (let i = 0; i < biddingHistory.length; i++) {
        var username = (biddingHistory[i].tentaikhoan);
        var mask = "****" + username.substring(username.length / 2);
        biddingHistory[i].tentaikhoan = mask;
    }

    var maskSeller = "****" + productDetails[0].SELLER.substring(productDetails[0].SELLER.length / 2);
    productDetails[0].SELLER = maskSeller;

    var hasMaxBid = null;
    if (biddingHistory.length > 0 && userId == biddingHistory[0].id_ndg) {
        if (biddingHistory[0].max != null) {
            hasMaxBid = biddingHistory[0].max;
        }
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
        isBanned,
        errMsg,
        hasMaxBid
    });
});

router.post("/:Id", UserOnly, async(req, res) => {

    const productId = +req.params.Id;
    const userId = res.locals.authUser.ID;
    const details = await model.getProduct(productId);
    let errMsg = []
        // check again ----------
    if (req.body.price <= details[0].GIA)
        errMsg.push("Đấu giá thất bại! Giá đặt phải lớn hơn giá hiện tại.");

    if ((req.body.price - details[0].GIA) % details[0].BUOCGIA !== 0) {
        if (details[0].GIAMUANGAY === null)
            errMsg.push("Đấu giá thất bại! Giá đặt không đúng bước giá.");
        else {
            if (req.body.price < details[0].GIAMUANGAY)
                errMsg.push("Đấu giá thất bại! Giá đặt không đúng bước giá.");
            else {
                if (req.body.price % 1000 !== 0)
                    errMsg.push("Giá mua ngay phải là bội số của 1.000 VNĐ");
            }
        }
    }


    const today = moment().format('YYYY-MM-DD HH:mm:ss');
    var endate = moment(details[0].NGAYHETHAN);
    endate = endate.format("YYYY-MM-DD HH:mm:ss");
    if (today > endate)
        errMsg.push("Đấu giá thất bại! Sản phẩm đã hết hạn đấu giá");
    // end check ---------------
    if (errMsg.length !== 0) {
        req.session.proView_errMsg = errMsg;
        return res.redirect(req.headers.referer);
    }

    var entity1 = {
        idnguoidaugia: userId,
        idsanpham: productId,
        thoigiandaugia: today,
        gia: req.body.price
    };
    const solanduocdaugia = details[0].SOLAN + 1;
    const giamuangay = details[0].GIAMUANGAY;
    var entity2 = {
        idsanpham: entity1.idsanpham,
        gia: entity1.gia,
        solanduocdaugia
    };

    if (details[0].TUDONGGIAHAN === 1) {
        // Do your operations
        var endDate = moment(details[0].NGAYHETHAN);
        endDate = endDate.format('YYYY-MM-DD HH:mm:ss');
        var diff = moment(endDate).diff(today, 'minutes');
        if (diff <= 5) // nếu còn 5 phút
        {
            var newExpiredDate = moment(endDate).add(10, 'minutes');
            entity2.ngayhethan = newExpiredDate.format('YYYY-MM-DD HH:mm:ss');
        }
    }
    // console.log(today);
    // console.log(endDate);
    // console.log(diff);

    var emailUser;
    var changeBid = 0;
    // check if same id as current holder: update bid
    result = await model.getBiddingHistory(details[0].ID);
    if (result.length > 0 && userId == result[0].id_ndg) {
        await model.removeBid(entity1.idnguoidaugia, entity1.idsanpham); // remove and add new bid
        if (req.body.auto != undefined) {
            entity1.MaxGia = entity1.gia;
            entity1.gia = details[0].GIA;
        }
        await model.addBidDetail(entity1);
        emailUser = entity1;
        changeBid = 1;
    } else { // Different bidder
        if (result.length > 0 && result[0].max != null) { // if current holder's auto is on
            if (result[0].max >= entity1.gia) { // if current holder wins
                var current = {
                    idnguoidaugia: result[0].id_ndg,
                    idsanpham: productId,
                    thoigiandaugia: today,
                    gia: req.body.price,
                    MaxGia: result[0].max
                }
                console.log(1);
                await model.removeBid(current.idnguoidaugia, current.idsanpham);
                await model.addBidDetail(current);

                entity1.thoigiandaugia = moment(today).add(1, 'seconds').format('YYYY-MM-DD HH:mm:ss');
                await model.removeBid(entity1.idnguoidaugia, entity1.idsanpham);
                await model.addBidDetail(entity1);
                emailUser = current;
            } else if (req.body.auto != undefined) { // if new bid wins and auto is on
                entity1.MaxGia = entity1.gia;
                entity1.gia = result[0].max + details[0].BUOCGIA;
                await model.removeBid(entity1.idnguoidaugia, entity1.idsanpham);
                await model.addBidDetail(entity1);
                emailUser = entity1;
            } else { // if new bid wins and auto is off
                await model.removeBid(entity1.idnguoidaugia, entity1.idsanpham);
                await model.addBidDetail(entity1);
                emailUser = entity1;
            }
            entity2.solanduocdaugia++;
        } else { // if current holder's auto is off
            if (req.body.auto != undefined) { // if new bid wins and auto is on
                entity1.MaxGia = entity1.gia;
                entity1.gia = details[0].GIA + details[0].BUOCGIA;
                await model.removeBid(entity1.idnguoidaugia, entity1.idsanpham);
                await model.addBidDetail(entity1);
            } else { // if new bid wins and auto is off
                await model.removeBid(entity1.idnguoidaugia, entity1.idsanpham);
                await model.addBidDetail(entity1);
            }
            emailUser = entity1;
        }
    }

    // update current price of product
    entity2.gia = emailUser.gia;
    const update = await model.updateProduct(entity2) // update current price of product


    var title = 'Sàn đấu giá trực tuyến'

    // mail to bidder
    var string = 'Bạn đã ra giá thành công: ' + emailUser.gia + ' VND cho sản phẩm ' + details[0].TENSANPHAM;
    const bidder = await model.getUserById(emailUser.idnguoidaugia);
    if (bidder.length > 0) {
        emailserver.send(bidder[0].Email, string, title)
    }

    // mail to seller
    var string = 'Có người đã đấu giá sản phẩm ' + details[0].TENSANPHAM + ' của bạn với giá ' + emailUser.gia + ' VND';
    const seller = await model.getUserById(details[0].IDNGUOIBAN);
    if (seller.length > 0) {
        emailserver.send(seller[0].Email, string, title)
    }

    // mail to previous bidder
    var previousUser = await model.getBiddingHistory(details[0].ID);
    if (previousUser.length > 1 && changeBid == 0) {
        var string = 'Có người đã vượt giá của bạn ở sản phẩm ' + details[0].TENSANPHAM + ' với giá ' + emailUser.gia + ' VND';
        const bidder = await model.getUserById(previousUser[1].id_ndg);
        if (bidder.length > 0) {
            emailserver.send(bidder[0].Email, string, title)
        }
    }
    res.redirect(req.headers.referer);
});

router.post("/:proID/rejectBidding/:IDToReject", SellerOnly, async(req, res) => {
    console.log("your here");
    const productId = +req.params.proID;
    const ownerId = res.locals.authUser.ID;
    const idToReject = +req.params.IDToReject;
    let errMsg = [];

    //check again
    const [productDetails, biddingHistory] = await Promise.all([
        model.getProduct(productId),
        model.getBiddingHistory(productId)
    ]);
    console.log(productDetails);
    console.log(biddingHistory);

    if (productDetails[0].IDNGUOIBAN !== ownerId) // kiểm tra chính chủ
        errMsg.push("Bạn không phải chủ sở hữu của sản phẩm này");
    if (ownerId === idToReject)
        errMsg.push("Bạn là chủ sỡ hữu sản phẩm này nên không thể chặn");
    var count = 0;
    for (let i = 0; i < biddingHistory.length; i++) {
        if (idToReject === biddingHistory[i].id_ndg) { count = 1; break; }
    }
    if (count === 0)
        errMsg.push("Người bị chặn không có trong lịch sử đấu giá");

    if (errMsg.length !== 0) {
        req.session.proView_errMsg = errMsg;
        return res.redirect(`/productView/${productId}`);
    }
    // end check -------------------

    // mail 
    var string = 'Bạn đã bị cấm đấu giá sản phẩm ' + productDetails[0].TENSANPHAM + ' bởi chủ đấu giá.';
    var title = 'Sàn đấu giá trực tuyến'
    const user = await model.getUserById(idToReject);
    if (user.length > 0) {
        emailserver.send(user[0].Email, string, title)
    }

    await model.rejectBidding(productId, idToReject);
    res.redirect(req.headers.referer);
});

router.get('/:Id/appendDes', SellerOnly, async(req, res) => {
    const productId = +req.params.Id;
    //check
    const [productDetails] = await Promise.all([
        model.getProduct(productId)
    ]);
    if (productDetails.length === 0) {
        return res.send("Không tồn tại sản phẩm này");
    }
    // console.log(productDetails[0].IDNGUOIBAN);
    // console.log(res.locals.authUser.ID);
    // console.log(productDetails[0].IDNGUOIBAN !== res.locals.authUser.ID);
    if (productDetails[0].IDNGUOIBAN !== res.locals.authUser.ID) {
        req.session.proView_errMsg = ["Bạn không phải chủ của sản phẩm, nên không thể thêm mô tả"];
        return res.redirect(`/productView/${productId}`);
    }
    res.render("appendDes", {
        title: "Bổ sung mô tả",
        css: ["HomeStyle.css"],
        js: [],
        proID: req.params.Id
    });
});


router.post('/:Id/appendDes', SellerOnly, async(req, res) => {
    const productId = +req.params.Id;
    //check
    const [productDetails] = await Promise.all([
        model.getProduct(productId)
    ]);
    if (productDetails.length === 0) {
        return res.send("Không tồn tại sản phẩm này");
    }
    if (productDetails[0].IDNGUOIBAN !== res.locals.authUser.ID) {
        req.session.proView_errMsg = ["Bạn không phải chủ của sản phẩm, nên không thể thêm mô tả"];
        return res.redirect(`/productView/${productId}`);
    }
    var now = moment().format("YYYY-MM-DD HH:mm:ss");
    var oldDes = productDetails[0].MOTADAI;
    var newDes = oldDes + 'Thêm vào lúc: ' + now + '<br/>' + req.body.fulldes;
    console.log(newDes);
    if (newDes.length >= 1000) {
        req.session.proView_errMsg = ["Mô tả quá dài, không thể thêm!"];
        return res.redirect(`/productView/${productId}`);
    }
    await model.appendDes(productId, newDes);
    res.redirect(`/productView/${productId}`);
});

router.post('/removeProduct/:Id', AdminOnly, async(req, res) => {
    const productId = req.params.Id;
    const result = await model.getProduct(productId);
    if (result.length === 0)
        res.send("Không có sản phẩm này");

    const delResult = await model.delProduct(productId);
    res.redirect('/');
});

module.exports = router;