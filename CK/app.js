var express = require("express");
var exphbs = require("express-handlebars"); //1. Import handlebars
var path = require("path");
var date = require("date-and-time");
const numeral = require('numeral');
require('express-async-errors');

var app = express();

app.use(express.static("public"));

//2. Set up handlebars: tell our app to actually use handlebars as our template engine.
app.engine(
  "hbs",
  exphbs({
    defaultLayout: "main.hbs",
    layoutsDir: "views/_layouts",
    helpers: {
      formatDate: val => date.format(val, 'YYYY/MM/DD'),
      formatMoney: val => numeral(val).format('0,0[.]00')+'d',
    }
  })
);

app.set("view engine", "hbs");


// user route
app.use('/bidder',require('./routes/bidder/home.bidder.route'));
app.use('/bidder/productViews',require('./routes/bidder/productView.bidder.route')); 
app.use('/lists/category',require('./routes/lists/category.lists.route'));
// app.use('/bidder',require('./routes/bidder/home.bidder.route'));
// app.use('/bidder',require('./routes/bidder/home.bidder.route'));
// app.use('/bidder',require('./routes/bidder/home.bidder.route'));
// app.use('/bidder',require('./routes/bidder/home.bidder.route'));
// admin route
// app.use('/admin', require('./routes/admin/'));










//4. Use HANDLEBARS TEMPLATE
app.get("/", function(req, res) {
  // dấu / yêu cầu hiển thị trang chủ
  res.render("home", {
    title: "Online Auction",
    css: ["HomeStyle.css", "carousel.css"],
    js: ["carousel.js"]
  });
});


app.get("/accountManagement", function(req, res) {
  res.render("accountManagement", {
    title: "Your account",
    css: ["HomeStyle.css", "AccountStyle.css"],
    js: ["AccountScript.js"]
  });
});

app.get("/allUsers", function(req, res) {
  res.render("allUsers", {
    title: "All users list",
    css: ["HomeStyle.css", "AccountStyle.css"],
    js: ["AccountScript.js"]
  });
});

app.get("/bidderList", function(req, res) {
  res.render("bidderList", {
    title: "Bidders List",
    css: ["HomeStyle.css", "AccountStyle.css"],
    js: ["AccountScript.js"]
  });
});

app.get("/changeInfo", function(req, res) {
  // res.render("changeInfo", {
  //   title: "Change infomation",
  //   css: ["HomeStyle.css", "AccountStyle.css"],
  //   js: ["AccountScript.js"]
  // });


  //chưa có
});

app.get("/daBan", function(req, res) {
  res.render("đãBán", {
    title: "Danh sách đã bán",
    css: ["List.css"],
    js: ["List.js"]
  });
});

app.get("/daDang", function(req, res) {
  res.render("đãĐăng", {
    title: "Danh Sách Đã Đăng",
    css: ["List.css"],
    js: ["List.js"]
  });
});

app.get("/daThang", function(req, res) {
  res.render("đãThắng", {
    title: "Danh Sách Đã Thắng",
    css: ["List.css"],
    js: ["List.js"]
  });
});

app.get("/dangDauGia", function(req, res) {
  res.render("đangĐấuGiá", {
    title: "Danh Sách Đang Đấu Giá",
    css: ["List.css"],
    js: ["List.js"]
  });
});


app.get("/login", function(req, res) {
 
// chưa có

});

app.get("/postProduct", function(req, res) {
  res.render("postProduct", {
    title: "Online Auction | Đăng sản phẩm",
    css: ["HomeStyle.css", "PostProduct.css"],
    js: ["PostProduct.js"]
  });
});

app.get("/productList", function(req, res) {
  res.render("productList", {
    title: "Product list",
    css: ["List.css"],
    js: ["List.js"]
  });

});

app.get("/productView", function(req, res) {
  res.render("productView", {
    title: "Thông tin sản phẩm",
    css: ["HomeStyle.css", "carousel.css", "ProductView.css"],
    js: ["ProductView.js","carousel.js"]
  });
});

app.get("/search", function(req, res) {
  res.render("search", {
    title: "Tìm kiếm",
    css: ["List.css"],
    js: ["List.js"]
  });

});

app.get("/theoDoi", function(req, res) {
  res.render("theoDõi", {
    title: "Danh sách theo dõi",
    css: ["List.css"],
    js: ["List.js"]
  });
});

app.get("/yourPointAndDetail", function(req, res) {
  res.render("yourPointAndDetail", {
    title: "Your point and details",
    css: ["HomeStyle.css", "AccountStyle.css"],
    js: ["AccountScript.js"]
  });
});

app.listen(3000, () => {
  console.log("server running at port 3000");
});
