const express = require("express");
const model = require("../../models/model");
const moment = require('moment');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const router = express.Router();
router.use(express.static("public"));

router.get("/", async(req, res) => {
    const userID = res.locals.authUser.ID;
    const info = await model.getUserById(userID);

    for (const row of info) {
        if (row.Loai === 1) {
            row.isBidder = true;
        } else if (row.Loai === 2) {
            row.isSeller = true;
        } else row.isAdmin = true;

        if (row.NgaySinh != null) {
            row.NgaySinh = moment(row.NgaySinh).format('DD/MM/YYYY');
        }
    }

    res.render("accountManagement", {
        title: "Quản lý thông tin cá nhân",
        css: ["HomeStyle.css", "AccountStyle.css"],
        js: ["AccountScript.js", "AccountView.js"],
        empty: info.length === 0,
        info
    });
});

router.post("/", async(req, res) => {
    const userID = res.locals.authUser.ID;
    const entity = {
        ID: userID,
        XinNangCap: true
    }
    console.log(entity);
    const result = await model.changeUserInfoById(entity);

    const info = await model.getUserById(userID);

    for (const row of info) {
        if (row.Loai === 1) {
            row.isBidder = true;
        } else if (row.Loai === 2) {
            row.isSeller = true;
        } else row.isAdmin = true;

        if (row.NgaySinh != null) {
            row.NgaySinh = moment(row.NgaySinh).format('DD/MM/YYYY');
        }
    }

    res.render("accountManagement", {
        title: "Quản lý thông tin cá nhân",
        css: ["HomeStyle.css", "AccountStyle.css"],
        js: ["AccountScript.js", "AccountView.js"],
        empty: info.length === 0,
        info,
    });
});

router.get("/modify", async(req, res) => {
    const userID = res.locals.authUser.ID;
    const info = await model.getUserById(userID);

    if (info[0].Loai === 1) {
        info[0].isBidder = true;
    } else if (info[0].Loai === 2) {
        info[0].isSeller = true;
    } else info[0].isAdmin = true;

    if (info[0].NgaySinh != null) {
        info[0].NgaySinh = moment(info[0].NgaySinh).format('DD/MM/YYYY');
    }

    var pos = info[0].HoTen.lastIndexOf(" ");
    var lastName = info[0].HoTen.substring(pos + 1);
    var firstName = info[0].HoTen.substring(0, pos);

    res.render("changeInfo", {
        title: "Thay đổi thông tin cá nhân",
        css: ["HomeStyle.css", "AccountStyle.css"],
        js: ["AccountScript.js", "AccountView.js"],
        empty: info.length === 0,
        info,
        lastName,
        firstName,
        errors: req.session.errors,
    });
    req.session.errors = null;
});

router.post("/modify", [
    check('Email', "Email không hợp lệ")
    .not().isEmpty()
    .isEmail()
    .normalizeEmail()
    .isLength({ max:50 }).withMessage("Email tối đa 50 ký tự")
    .custom(async (value, { req }) => {
        result = await model.getIdByEmail(value);
        if (result.length > 0 && result[0].ID != req.body.id) {
            return Promise.reject('Email đã tồn tại');
        }
    
    }),
    check('NgaySinh', "Ngày sinh không hợp lệ")
    .optional({checkFalsy: true}) 
    .custom( val => {
        if (moment(val, "DD/MM/YYYY").isValid() || val === "__/__/____" ) {
            return val;
        } else {
            throw new Error("Ngày sinh không hợp lệ");
        }
    }),
    check('firstName', "Họ không hợp lệ")
    .not().isEmpty()
    .trim()
    .isLength({ max:20 }).withMessage("Họ tối đa 20 ký tự"),
    check('lastName', "Tên không hợp lệ")
    .not().isEmpty()
    .trim()
    .isLength({ max:10 }).withMessage("Tên tối đa 10 ký tự"),
    check('DiaChi', "Địa chỉ không hợp lệ")
    .optional({checkFalsy: true}) 
    .trim()
    .isLength({ max:1000 }).withMessage("Địa chỉ tối đa 1000 ký tự"),
    check('DienThoai', "Điện thoại không hợp lệ" )
    .optional({checkFalsy: true}) 
    .trim()
    .isLength({ max:20 }).withMessage("Điện thoại tối đa 20 chữ số"),
], async(req, res) => {
    var errors = validationResult(req).array();
    if (errors.length > 0) {
        req.session.errors = errors;

        res.redirect('/accountManagement/modify');
    } else {
        const entity = req.body;
        entity.HoTen = req.body.firstName + " " + req.body.lastName;

        if (entity.NgaySinh != "" && entity.NgaySinh != "__/__/____"){
            entity.NgaySinh = moment(req.body.NgaySinh, 'DD/MM/YYYY').format('YYYY/MM/DD');
        } 
        else {
            delete entity.NgaySinh;
        }
        delete entity.firstName;
        delete entity.lastName;


        await model.updateNguoiDung(entity);
        res.redirect('/accountManagement');
    }
});

router.get("/modifyPass", async(req, res) => {
    const userID = res.locals.authUser.ID;
    const info = await model.getUserById(userID);

    if (info[0].Loai === 1) {
        info[0].isBidder = true;
    } else if (info[0].Loai === 2) {
        info[0].isSeller = true;
    } else info[0].isAdmin = true;

    if (info[0].NgaySinh != null) {
        info[0].NgaySinh = moment(info[0].NgaySinh).format('DD/MM/YYYY');
    }

    res.render("changeInfo-Pass", {
        title: "Thay đổi mật khẩu",
        css: ["HomeStyle.css", "AccountStyle.css"],
        js: ["AccountScript.js", "AccountView.js"],
        empty: info.length === 0,
        info,
        errors: req.session.errors,
    });
    req.session.errors = null;
});

router.post("/modifyPass", [
    check('formerPass')
    .not().isEmpty()
    .custom( async (val, { req }) => {
        const user = await model.getIdByUsername(req.body.TenTaiKhoan);
        const rs = bcrypt.compareSync(val, user[0].MatKhau);
        if (rs === false) {
            throw new Error("Sai mật khẩu");
        } else {
            return val;

        }
    }),
    check('newPass')
    .not().isEmpty()
    .isLength({ min: 6 }).withMessage("Mật khẩu mới phải có ít nhất 6 ký tự")
    .isLength({ max:100 }).withMessage("Mật khẩu tối đa 100 ký tự")
    .custom((val, { req }) => {
        if (val !== req.body.repeatPass) {
            throw new Error("Mật khẩu mới nhập lại không đúng");
        } else {
            return val;
        }
    }),
], async(req, res) => {
    var errors = validationResult(req).array();
    if (errors.length > 0) {
      req.session.errors = errors;
      res.redirect('/accountManagement/modifyPass');
    } else {  
        const N = 10;
        const hash = bcrypt.hashSync(req.body.newPass, N);
  
        var entity = {
            id: req.body.id,
            MatKhau: hash,
        }
        await model.changePassById(entity);
        res.redirect('/accountManagement');
    }
  });

module.exports = router;
