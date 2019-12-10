const express = require("express");
const model = require("../../models/model");
const router = express.Router();
router.use(express.static("public"));
const isUser = true;

router.get("/:id", async(req, res) => {
    //id = id user
    // const id = +req.params.id;
    const catList = await model.getCategories();
    // const [value1, value2] = await Promise.all([getValue1Async(), getValue2Async()]);
    res.render("postProduct", {
        title: "Online Auction | Đăng sản phẩm",
        css: ["HomeStyle.css", "PostProduct.css"],
        js: ["PostProduct.js"],
        catList
    });
});

module.exports = router;