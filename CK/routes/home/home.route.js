const express = require("express");
const bcrypt = require('bcryptjs');
const session = require('express-session');
const model = require("../../models/model");
const GuestOnly = require('../../middlewares/GuestOnly.mdw');
const { check, validationResult } = require('express-validator');
const emailserver = require('../../middlewares/email.mdw');
const crypto = require('crypto');
var request = require('request');

const router = express.Router();

router.use(express.static("public"));
router.use('/login', express.static('public'));
router.use('/newPass', express.static('public'));

router.get("/", async(req, res) => {

    const [highestPrice, highestBidTimes, nearlyExpired] = await Promise.all([
        model.getTop5HighestPrice(),
        model.getTop5HighestBidTimes(),
        model.getTop5NearlyExpired(),
    ]);
    res.render("home", {
        title: "Online Auction",
        css: ["HomeStyle.css", "carousel.css"],
        js: ["carousel.js", "ProductView.js"],
        highestPrice,
        highestBidTimes,
        nearlyExpired
    });
    //console.log(res.locals);
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

router.post('/login', async(req, res) => {
    // if g-recaptcha-response is blank or null means user has not selected the captcha, so return the error.
    if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
        req.session.errors = [{ msg: 'Vui lòng nhập captcha' }];
        return res.redirect('/login')
    }
    // Put your secret key here.
    var secretKey = "6LfRhcwUAAAAAFh6To7y1W5rznjx9gOlxyyO56O1";
    // req.connection.remoteAddress will provide IP address of connected user.
    var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
    // Hitting GET request to the URL, Google will respond with success or error scenario.
    request(verificationUrl, function(error, response, body) {
        body = JSON.parse(body);
        // Success will be true or false depending upon captcha validation.
        if (body.success !== undefined && !body.success) {
            req.session.errors = [{ msg: 'Vui lòng nhập lại captcha' }];
            return res.redirect('/login')
        }
    });


    const user = await model.getIdByUsername(req.body.TenTaiKhoan);
    if (user.length == 0) {
        req.session.errors = [{ msg: 'Tài khoản không tồn tại' }];
        res.redirect('/login');
    } else {

        const rs = bcrypt.compareSync(req.body.fPass, user[0].MatKhau);
        if (rs === false) {
            req.session.errors = [{ msg: 'Sai mật khẩu' }];
            res.redirect('/login');
        } else {
            delete user[0].MatKhau;
            req.session.isAuthenticated = true;
            req.session.authUser = user[0];

            const url = req.query.retUrl || '/';
            res.redirect(url);
        }
    }
})

router.get('/logout', (req, res) => {
    req.session.isAuthenticated = false;
    req.session.authUser = null;
    res.locals.isAuthenticated = false;
    res.locals.authUser = null;
    // res.redirect("/");
    res.redirect(req.headers.referer);
});

router.post('/login/register', [
    check('TenTaiKhoan', "Tên tài khoản không hợp lệ")
    .not().isEmpty()
    .trim()
    .isLength({ min: 6 }).withMessage("Tên tài khoản phải có ít nhất 6 ký tự")
    .isLength({ max: 20 }).withMessage("Tên tài khoản tối đa 20 ký tự")
    .custom(async value => {
        return id = await model.getIdByUsername(value).then(result => {
            if (result.length > 0) {
                return Promise.reject('Tên tài khoản đã tồn tại');
            }
        })
    }),
    check('Email', "Email không hợp lệ")
    .not().isEmpty()
    .isEmail()
    .normalizeEmail()
    .isLength({ max: 50 }).withMessage("Email tối đa 50 ký tự")
    .custom(async value => {
        return id = await model.getIdByEmail(value).then(result => {
            if (result.length > 0) {
                return Promise.reject('Email đã tồn tại');
            }
        })
    }),
    check('fPass')
    .not().isEmpty()
    .isLength({ min: 6 }).withMessage("Mật khẩu phải có ít nhất 6 ký tự")
    .isLength({ max: 100 }).withMessage("Mật khẩu tối đa 100 ký tự")
    .custom((val, { req }) => {
        if (val !== req.body.fRPass) {
            throw new Error("Mật khẩu nhập lại không đúng");
        } else {
            return val;
        }
    }),
    check('fFirstName', "Họ không hợp lệ")
    .not().isEmpty()
    .trim()
    .isLength({ max: 20 }).withMessage("Họ tối đa 20 ký tự"),
    check('fLastName', "Tên không hợp lệ")
    .not().isEmpty()
    .trim()
    .isLength({ max: 10 }).withMessage("Tên tối đa 10 ký tự"),
], async(req, res) => {
    var errors = validationResult(req).array();
    if (errors.length > 0) {
        req.session.errors = errors;
        req.session.saveForm = req.body;
        res.redirect('/login#sign-up');
    } else {

        // if g-recaptcha-response is blank or null means user has not selected the captcha, so return the error.
        if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
            req.session.errors = [{ msg: 'Vui lòng nhập lại captcha' }];
            req.session.saveForm = req.body;
            return res.redirect('/login#sign-up')
        }
        // Put your secret key here.
        var secretKey = "6LfRhcwUAAAAAFh6To7y1W5rznjx9gOlxyyO56O1";
        // req.connection.remoteAddress will provide IP address of connected user.
        var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
        // Hitting GET request to the URL, Google will respond with success or error scenario.
        request(verificationUrl, function(error, response, body) {
            body = JSON.parse(body);
            // Success will be true or false depending upon captcha validation.
            if (body.success !== undefined && !body.success) {
                req.session.errors = [{ msg: 'Vui lòng nhập lại captcha' }];
                req.session.saveForm = req.body;
                return res.redirect('/login#sign-up')
            }
        });



        const N = 10;
        const hash = bcrypt.hashSync(req.body.fPass, N);

        const entity = {
            TenTaiKhoan: req.body.TenTaiKhoan,
            Email: req.body.Email,
            MatKhau: hash,
            HoTen: req.body.fFirstName + " " + req.body.fLastName,
            Loai: 1,
            XinNangCap: false,
            TongDiemDanhGia: 0,
        }

        const result = await model.addUser(entity);
        res.redirect('/login');
    }
});

router.post('/forgot', async(req, res) => {
    const user = await model.getIdByEmail(req.body.Email);
    if (user.length == 0) {
        req.session.errors = [{ msg: 'Email không tồn tại' }];
        res.redirect('/login#forgot');
    } else {

        var buf = crypto.randomBytes(48);
        var token = buf.toString('hex');

        var entity = {
            token: token,
            id: user[0].ID
        }
        var result = await model.updateNguoiDung(entity);
        result = await model.updateTokenExpire(user[0].ID);

        var title = 'Sàn đấu giá trực tuyến'
        var string = 'Nhấn vào đây để đặt lại mật khẩu mới: http://localhost:3000/newPass/' + token;
        emailserver.send(req.body.Email, string, title)

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
            if (result[0].isExpire == 1) {
                return Promise.reject('Timeout, please return to Forgot Password page to try again');
            }
        })
    }),
    check('fPass')
    .not().isEmpty()
    .isLength({ min: 6 }).withMessage("Mật khẩu phải có ít nhất 6 ký tự")
    .isLength({ max: 100 }).withMessage("Mật khẩu tối đa 100 ký tự")
    .custom((val, { req }) => {
        if (val !== req.body.fRPass) {
            throw new Error("Mật khẩu nhập lại không đúng");
        } else {
            return val;
        }
    }),
], async(req, res) => {
    var errors = validationResult(req).array();
    if (errors.length > 0) {
        req.session.errors = errors;
        res.redirect('/newPass/' + req.body.token);
    } else {
        const user = await model.checkTimeoutToken(req.body.token)
        const N = 10;
        const hash = bcrypt.hashSync(req.body.fPass, N);

        var entity = {
            MatKhau: hash,
            token: req.body.token
        }
        await model.changePassByToken(entity);

        entity = {
            token: 0,
            id: user[0].ID
        }
        await model.updateNguoiDung(entity);

        res.redirect('/login');
    }
});

module.exports = router;