const express = require("express");
const model = require("../../models/model");
const router = express.Router();
router.use(express.static("public"));
const isUser = true;

router.get("/:id", async(req, res) => {
    //id = id sản phẩm
    const id = +req.params.id;
    const [productDetails, image, biddingHistory] =
    await Promise.all([model.getProduct(id), model.getImage(id), model.getBiddingHistory(id)]);
    console.log(biddingHistory);
    // const [value1, value2] = await Promise.all([getValue1Async(), getValue2Async()]);
    res.render("productView", {
        title: "Thông tin sản phẩm",
        css: ["HomeStyle.css", "carousel.css", "ProductView.css"],
        js: ["ProductView.js", "carousel.js"],
        details: productDetails[0],
        biddingHistory,
        image,
        isUser
    });
});

module.exports = router;