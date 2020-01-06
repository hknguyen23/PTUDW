const express = require("express");
const model = require("../../models/model");
const moment = require("moment");
const fs = require('fs');
const path = require('path');
const multer = require("multer");
const util = require("util");
const rename = util.promisify(fs.rename);
const newDirectory = Date.now();
const storage = multer.diskStorage({
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
    destination: function(req, file, cb) {
        destination = `./public/assets/images/product/${newDirectory}`;
        var stat = null;
        try {
            stat = fs.statSync(destination);
        } catch (err) {
            fs.mkdirSync(destination);
        }
        if (stat && !stat.isDirectory()) {
            throw new Error('Directory cannot be created because an inode of a different type exists at "' + destination + '"');
        }
        cb(null, destination);
    }
});
const upload = multer({ storage });
const router = express.Router( /*{ mergeParams: true }*/ );
router.use(express.static("public"));

router.get("/", async(req, res) => {

    let userId = null;
    if (res.locals.authUser !== null)
        userId = res.locals.authUser.ID;

    let errMsg = [];
    if (req.session.proView_errMsg !== 'undefined') {
        errMsg = req.session.postProdVw_errMsg;
        delete req.session.postProdVw_errMsg;
    } else errMsg = false;

    const catList = await model.getCategoriesLV2();
    res.render("postProduct", {
        title: "Đăng sản phẩm",
        css: ["HomeStyle.css", "PostProduct.css"],
        js: ["PostProduct.js"],
        catList,
        errMsg
    });
});

//post để đăng sp
router.post("/", upload.array('fuMain'), async(req, res) => {

    // check again 
    let errMsg = [];
    var entity = req.body;
    console.log(entity);
    entity.TenSanPham = (entity.TenSanPham).replace(/\s+/g, " ").replace(/^\s|\s$/g, ""); // chuẩn hóa tên sp
    if ((entity.TenSanPham !== null && (/\S/.test(entity.TenSanPham)) === false) || entity.IDLoai === '' || entity.Gia === '' || entity.BuocGia === '' ||
        (entity.MoTaDai !== null && (/\S/.test(entity.MoTaDai)) === false) || entity.songay === '' || req.files.length === 0) // check rỗng
        errMsg.push("Các thông tin đánh (*) không được để trống");
    if (entity.TenSanPham.length <= 3)
        errMsg.push("Tên sản phẩm không được quá ngắn (nhiều hơn 3 ký tự)");
    if (entity.Gia % 1000 !== 0)
        errMsg.push("Giá sản phẩm phải là bội số của 1.000 VNĐ");
    if (entity.BuocGia % 1000 !== 0)
        errMsg.push("Bước giá phải là bội số của 1.000 VNĐ");
    if (entity.GiaMuaNgay !== '0' || entity.GiaMuaNgay !== '') {
        if (entity.GiaMuaNgay % 1000 !== 0)
            errMsg.push("Giá mua ngay phải là bội số của 1.000 VNĐ");
        if (entity.GiaMuaNgay <= entity.Gia)
            errMsg.push("Giá mua ngay phải lớn hơn giá khởi điểm");
    }
    if (entity.songay <= 0)
        errMsg.push("Số ngày đăng bán không phải lớn hơn 1");
    if (entity.MoTaDai.length >= 1000)
        errMsg.push("Mô tả sản phẩm quá dài");
    if (req.files.length < 3)
        errMsg.push("Phải chọn tối thiểu 3 ảnh cho sản phẩm");

    // nếu có lỗi, thì gửi kèm lỗi rồi return luôn
    if (errMsg.length !== 0) {
        req.session.postProdVw_errMsg = errMsg;
        return res.redirect('/postProduct'); // phải return
    }

    // nếu ko có lỗi thì tiến hành ghi vào db
    // chỉnh lại entity cho phù hơp để ghi vào db
    if (entity.GiaMuaNgay === '0' || entity.GiaMuaNgay === '')
        delete entity.GiaMuaNgay;
    entity.IDNguoiBan = res.locals.authUser.ID;
    entity.NgayDang = moment().format("YYYY-MM-DD HH:mm:ss");
    entity.NgayHetHan = moment(entity.NgayDang).add(entity.songay, 'days').format("YYYY-MM-DD HH:mm:ss");
    delete entity.songay;
    (entity.TuDongGiaHan === 'on') ? entity.TuDongGiaHan = 1: entity.TuDongGiaHan = 0;
    (entity.LuonDuocDauGia === 'on') ? entity.LuonDuocDauGia = 1: entity.LuonDuocDauGia = 0;
    entity.mainimg = '-1';
    const result = await model.addNewProduct(entity);

    await rename(req.files[0].destination, `./public/assets/images/product/${result.insertId}`);
    // fs.rename là 1 hảm bất đồng bộ, sẽ gây lỗi nếu đặt trong for loop, nên fải dùng async await

    var productImg = [];
    for (var k = 0; k < req.files.length; k++) {
        var newUrl = `./public/assets/images/product/${result.insertId}/${k+1}` + path.extname(req.files[k].originalname);
        await rename(`./public/assets/images/product/${result.insertId}/${req.files[k].filename}`, newUrl);
        productImg.push(newUrl.replace('./public/', '')); // logic address doesn't need the /public
    }
    await model.addProducImg(result.insertId, productImg);
    res.redirect(`/productView/${result.insertId}`);
});
module.exports = router;