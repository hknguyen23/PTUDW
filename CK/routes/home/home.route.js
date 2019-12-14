const express = require("express");

const router = express.Router();

const isUser = true;

router.use(express.static("public"));

router.get("/", (req, res) => {
  res.render("home", {
    title: "Online Auction",
    css: ["HomeStyle.css", "carousel.css"],
    js: ["carousel.js"],
    isUser
  });
});
module.exports = router;
