const model = require('../models/model');

module.exports = async(req, res, next) => {

    if (req.session.isAuthenticated === false)
        return res.redirect(`/login?retUrl=${req.originalUrl}`);

    //console.log(rows);
    if (res.locals.authUser.Loai === 2) {
        res.locals.isAuthenticated = true;
    } else return res.send("Hãy nâng cấp thành Seller!");
    //console.log("là seller");
    next();
}