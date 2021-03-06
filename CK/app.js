const express = require("express");
const exphbs = require("express-handlebars"); //1. Import handlebars
const hbs_sections = require('express-handlebars-sections');
const path = require("path");
const morgan = require('morgan');
const date = require("date-and-time");
const numeral = require('numeral');
const moment = require('moment');
const session = require('express-session');
const UserOnly = require('./middlewares/UserOnly.mdw');
const SellerOnly = require('./middlewares/SellerOnly.mdw');
const AdminOnly = require('./middlewares/AdminOnly.mdw');
require('express-async-errors');

const app = express();

app.use(express.static("public"));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(session({
    secret: 'secret text abcdef',
    saveUninitialized: false,
    resave: false
}));
//2. Set up handlebars: tell our app to actually use handlebars as our template engine.
app.engine(
    "hbs",
    exphbs({
        defaultLayout: "main.hbs",
        layoutsDir: "views/_layouts",
        helpers: {
            section: hbs_sections(),
            formatDate: val => date.format(val, 'YYYY/MM/DD'),
            formatDateTime: val => moment(val).format('YYYY/MM/DD HH:mm:ss'),
            formatMoney: val => numeral(val).format('0,0[.]00') + ' VNĐ',
            if_eq: function(a, b, opts) {
                if (a == b) // Or === depending on your needs
                    return opts.fn(this);
                else
                    return opts.inverse(this);
            },
            isEqual: (foo, bar) => foo === bar,
            isLessThanOrEqual: (foo, bar) => foo <= bar,
            isDefinedVal: val => {
                // console.log(val);
                // console.log(val !== null);
                // console.log(typeof(val) !== 'undefined');
                return (val !== null) && typeof(val) !== 'undefined';
            },
            isPast: val => {
                const today = moment().format('YYYY-MM-DD HH:mm:ss');
                const val_formated = moment(val).format('YYYY-MM-DD HH:mm:ss');
                return (today > val_formated) ? true : false;
            },
            or: (foo, bar) => (foo || bar),
            countDown: val => {
                const today = moment().format('YYYY-MM-DD HH:mm:ss');
                var endDate = moment(val);
                endDate = endDate.format('YYYY-MM-DD HH:mm:ss');
                console.log(endDate);
                if (today > endDate)
                    return endDate;
                var duration = moment(endDate).diff(today, 'days');
                // console.log(today);
                // console.log(endDate);
                // console.log(duration);
                return (duration <= 3) ? moment(new Date(val)).locale('VI').fromNow() : endDate.format('YYYY/MM/DD HH:mm:ss');
            },
        },
    }));

app.set("view engine", "hbs");

//middlewares
require('./middlewares/locals.mdw')(app);
require('./middlewares/cron.mdw')(app);

// user route
app.use('/', require('./routes/home/home.route'));
app.use('/', require('./routes/changeFav.route'));

app.use('/lists', require('./routes/lists/searchable.lists.route'));
app.use('/lists/acc', UserOnly, require('./routes/lists/personal.lists.route'));
app.use('/lists/category', require('./routes/lists/category.lists.route'));
app.use('/lists/search', require('./routes/lists/searchable.lists.route'));

app.use('/postProduct', SellerOnly, require('./routes/seller/postProduct.seller.route'));
app.use('/user', require('./routes/home/home.route'));
app.use('/productView', require('./routes/productView/productView.route'));

app.use('/score', require('./routes/accountManagement/publicScore.route'));
app.use('/yourPointAndDetail', UserOnly, require('./routes/accountManagement/yourPointAndDetail.route'));
app.use('/accountManagement', UserOnly, require('./routes/accountManagement/accountManagement.route'));

app.use('/bidderList', AdminOnly, require('./routes/admin/bidderUpgradeRequestList.route'));
app.use('/userView', AdminOnly, require('./routes/admin/userView.route'));
app.use('/categoryLv1', AdminOnly, require('./routes/admin/categoryLv1.route'));
app.use('/categoryLv2', AdminOnly, require('./routes/admin/categoryLv2.route'));

// app.use('/bidder',require('./routes/bidder/home.bidder.route'));
// app.use('/bidder',require('./routes/bidder/home.bidder.route'));
// app.use('/bidder',require('./routes/bidder/home.bidder.route'));
// app.use('/bidder',require('./routes/bidder/home.bidder.route'));
// admin route
// app.use('/admin', require('./routes/admin/'));



// ERROR HANDLER
app.use((req, res, next) => {
    // res.render('vwError/404');
    res.send('You\'re lost');
})

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('View error on console.');
})

app.listen(3000, () => {
    console.log("server running at port 3000");
});