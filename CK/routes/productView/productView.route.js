const express = require("express");
const model = require("../../models/model");
const router = express.Router({ mergeParams: true });
router.use(express.static("public"));


router.get("/:Id", async(req, res) => {
    //id = id sản phẩm
    const productId = +req.params.Id;
    const userId = +req.params.userID;

    const [productDetails, image, biddingHistory, relationProduct, favProduct] =
    await Promise.all([model.getProduct(productId), model.getImage(productId), model.getBiddingHistory(productId),
        model.getRelation(productId), model.getFavorite(userId, productId)
    ]);
    // const [value1, value2] = await Promise.all([getValue1Async(), getValue2Async()]);
    console.log(favProduct);
    res.render("productView", {
        title: "Thông tin sản phẩm",
        css: ["HomeStyle.css", "carousel.css", "ProductView.css"],
        js: ["ProductView.js", "carousel.js"],
        details: productDetails[0],
        biddingHistory,
        image,
        relationProduct,
        isFav: favProduct.length !== 0,
        userId
    });
});

module.exports = router;