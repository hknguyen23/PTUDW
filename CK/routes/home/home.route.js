const express = require("express");
const bcrypt = require('bcryptjs');
const session = require('express-session');
const model = require("../../models/model");
const { check, validationResult } = require('express-validator');

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

router.get("/login", (req, res) => {
  res.render("login", {
    title: "Đăng nhập",
    css: ["Login.css"],
    js: ["Login.js"],
    errors: req.session.errors,
    saveForm: req.session.saveForm
  });
  req.session.errors = null;
  req.session.saveForm = null;
});

router.post('/login/register', [
  check('TenTaiKhoan', "Tên tài khoản không hợp lệ")
      .not().isEmpty()
      .trim()
      .isLength({ min: 6 }).withMessage("Tên tài khoản phải có ít nhất 6 ký tự")
      .custom(value => {
        return id = model.getIdByUsername(value).then(result => {
          if (result.length > 0) {
            return Promise.reject('Tên tài khoản đã tồn tại');
          }
        })
      }),
  check('Email', "Email không hợp lệ")
      .isEmail()
      .normalizeEmail()
      .custom(value => {
        console.log(value);
        return id = model.getIdByEmail(value).then(result => {
          if (result.length > 0) {
            return Promise.reject('E-mail đã tồn tại');
          }
        })
      }),
  check('fPass')
      .not().isEmpty()
      .isLength({ min: 6 }).withMessage("Mật khẩu phải có ít nhất 6 ký tự")
      .custom((val, { req }) => {
        if (val !== req.body.fRPass) {
            throw new Error("Mật khẩu nhập lại không đúng");
        } else {
            return val;
        }
      }),
  check('fFirstName', "")
      .not().isEmpty()
      .trim(),
  check('fLastName')
      .not().isEmpty()
      .trim(),
],async (req, res) => {
  var errors = validationResult(req).array();
  if (errors.length > 0) {
    req.session.errors = errors;
    req.session.saveForm = req.body;
    res.redirect('/login#sign-up');
  } else {  
    const N = 10;
    const hash = bcrypt.hashSync(req.body.fPass, N);

    const entity = req.body;
    entity.MatKhau = hash;
    entity.HoTen = req.body.fFirstName + " " + req.body.fLastName;
    entity.Loai = 3;
    entity.XinNangCap = false;
    entity.TongDiemDanhGia = 0;

    delete entity.fPass;
    delete entity.fRPass;
    delete entity.fFirstName;
    delete entity.fLastName;

    const result = await model.addUser(entity);
    res.redirect('/login');
  }
});

module.exports = router;
