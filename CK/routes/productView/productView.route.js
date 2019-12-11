const express = require("express");
const model = require("../../models/model");
const router = express.Router({ mergeParams: true });
router.use(express.static("public"));


router.get("/:Id", async(req, res) => {
    //id = id sản phẩm
    const productId = +req.params.Id;
    const userId = +req.params.userID;

    const [productDetails, image, biddingHistory, relationProduct, favProduct, userScore] =
    await Promise.all([model.getProduct(productId), model.getImage(productId), model.getBiddingHistory(productId),
        model.getRelation(productId), model.getFavorite(userId, productId), model.getScore(userId)
    ]);
    console.log(userScore);
    // const [value1, value2] = await Promise.all([getValue1Async(), getValue2Async()]);
    res.render("productView", {
        title: "Thông tin sản phẩm",
        css: ["HomeStyle.css", "carousel.css", "ProductView.css"],
        js: ["ProductView.js", "carousel.js"],
        details: productDetails[0],
        biddingHistory,
        image,
        relationProduct,
        isFav: favProduct.length !== 0,
        userId,
        userScore: userScore[0]
    });
});

router.post("/:Id", async(req, res) => {

    const productId = +req.params.Id;
    const userId = +req.params.userID;
    var entity = {
        idnguoidaugia: userId,
        idsanpham: productId,
        thoigiandaugia: '2019-12-13 23:21:33',
        gia: req.body.price
    }
    const result = await model.add(entity);

    const [productDetails, image, biddingHistory, relationProduct, favProduct, userScore] =
    await Promise.all([model.getProduct(productId), model.getImage(productId), model.getBiddingHistory(productId),
        model.getRelation(productId), model.getFavorite(userId, productId), model.getScore(userId)
    ]);
    // const [value1, value2] = await Promise.all([getValue1Async(), getValue2Async()]);
    res.render("productView", {
        title: "Thông tin sản phẩm",
        css: ["HomeStyle.css", "carousel.css", "ProductView.css"],
        js: ["ProductView.js", "carousel.js"],
        details: productDetails[0],
        biddingHistory,
        image,
        relationProduct,
        isFav: favProduct.length !== 0,
        userId,
        userScore: userScore[0]
    });

});
module.exports = router;