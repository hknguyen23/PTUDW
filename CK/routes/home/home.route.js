const express = require("express");
const bcrypt = require('bcryptjs');
const session = require('express-session');
const model = require("../../models/model");
const GuestOnly = require('../../middlewares/GuestOnly.mdw');
const { check, validationResult } = require('express-validator');
const emailserver = require('../../middlewares/email.mdw');
const crypto = require('crypto');

const router = express.Router();

router.use(express.static("public"));
router.use('/login', express.static('public'));
router.use('/newPass', express.static('public'));

router.get("/", (req, res) => {
  res.render("home", {
    title: "Online Auction",
    css: ["HomeStyle.css", "carousel.css"],
    js: ["carousel.js"],
  });
  console.log(res.locals);
});

router.get("/login", GuestOnly, (req, res) => {
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

router.post('/login', async (req, res) => {
  const user = await model.getIdByUsername(req.body.TenTaiKhoan);
  if (user.length == 0) {
    return res.render("login", {
      title: "Đăng nhập",
      css: ["Login.css"],
      js: ["Login.js"],
      err_message: 'Tài khoản không tồn tại'
    });
  }
  const rs = bcrypt.compareSync(req.body.fPass, user[0].MatKhau);
  if (rs === false) {
    return res.render("login", {
      title: "Đăng nhập",
      css: ["Login.css"],
      js: ["Login.js"],
      err_message: 'Sai mật khẩu'
    });
  }

  delete user[0].MatKhau;
  req.session.isAuthenticated = true;
  req.session.authUser = user[0];

  const url = req.query.retUrl || '/';
  res.redirect(url);
})

router.get('/logout', (req, res) => {
  req.session.isAuthenticated = false;
  req.session.authUser = null;
  res.locals.isAuthenticated = false;
  res.locals.authUser = null;
  res.redirect("/");
});

router.post('/login/register', [
  check('TenTaiKhoan', "Tên tài khoản không hợp lệ")
      .not().isEmpty()
      .trim()
      .isLength({ min: 6 }).withMessage("Tên tài khoản phải có ít nhất 6 ký tự")
      .custom(async value => {
        return id = await model.getIdByUsername(value).then(result => {
          if (result.length > 0) {
            return Promise.reject('Tên tài khoản đã tồn tại');
          }
        })
      }),
  check('Email', "Email không hợp lệ")
      .isEmail()
      .normalizeEmail()
      .custom(async value => {
        console.log(value);
        return id = await model.getIdByEmail(value).then(result => {
          if (result.length > 0) {
            return Promise.reject('Email đã tồn tại');
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

router.post('/forgot', async (req, res) => {
  const user = await model.getIdByEmail(req.body.Email);
  if (user.length == 0) {
    req.session.errors = [{msg: 'Email không tồn tại'}];
    res.redirect('/login#forgot');
  }
  else{

    var buf = crypto.randomBytes(48);
    var token = buf.toString('hex');

    var entity = {
      token: token,
      id: user[0].ID
    }
    var result = await model.updateToken(entity);
    result = await model.updateTokenExpire(user[0].ID);

    var string = 'http://localhost:3000/newPass/' + token;
    emailserver.send(req.body.Email, string)

    delete user;
    res.redirect('/login');
  }
})

router.get("/newPass/:token", GuestOnly, (req, res) => {
  res.render("newPass", {
    title: "Reset Password",
    css: ["Login.css"],
    errors: req.session.errors,
    token: req.params.token
  });
  req.session.errors = null;
});

router.post('/newPass', [
  check('token', "Timeout")
      .not().isEmpty()
      .custom(async value => {
        return await model.checkTimeoutToken(value).then(result => {
          if (result.length == 0) {
            return Promise.reject('Unauthorized access');
          }
          if (result[0].isExpire == 1){
            return Promise.reject('Timeout, please return to Forgot Password page to try again');
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
],async (req, res) => {
  var errors = validationResult(req).array();
  if (errors.length > 0) {
    req.session.errors = errors;
    res.redirect('/newPass/'+req.body.token);
  } else {  
    const N = 10;
    const hash = bcrypt.hashSync(req.body.fPass, N);

    const entity = {
      MatKhau: hash,
      token: req.body.token
    }
    const result = await model.changePass(entity);
    res.redirect('/login');
  }
});

module.exports = router;
