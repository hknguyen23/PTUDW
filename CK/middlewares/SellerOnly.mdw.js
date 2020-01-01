const model = require('../models/model');

module.exports = async(req, res, next) => {

    if (req.session.isAuthenticated === false)
        return res.redirect(`/login?retUrl=${req.originalUrl}`);

    const rows = await model.getUserById(req.session.authUser.ID);
    //console.log(rows);
    if (rows[0].Loai === 2)
        res.locals.isAuthenticated = true;
    else return res.send("Hãy nâng cấp thành Seller để thực hiện đăng bán sản phẩm");

    next();
}