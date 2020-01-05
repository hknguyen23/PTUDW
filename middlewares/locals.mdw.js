const model = require('../models/model');

module.exports = function(app) {
    app.use(async(req, res, next) => {
        const [catLV1, catLV2, userType] = await Promise.all([
            model.getCategoriesLV1(),
            model.getCategoriesLV2(),
        ]);

        res.locals.catLV1 = catLV1;
        res.locals.catLV2 = catLV2;

        if (typeof(req.session.isAuthenticated) === 'undefined') {
            req.session.isAuthenticated = false;
            req.session.authUser = null; //
        }
        res.locals.isAuthenticated = req.session.isAuthenticated;
        res.locals.authUser = req.session.authUser;
        // //console.log(req.session);
        // if (res.locals.authUser !== null) {
        //     const user = await model.getUserById(res.locals.authUser.ID);
        //     if (user[0].Loai === 1)
        //         res.locals.isBidder = true;
        //     else if (user[0].Loai === 2)
        //         res.locals.isSeller = true;
        //     else res.locals.isAdmin = true;
        // }
        next();
    })
};

// module.exports = async (req, res, next) => {
//   const rows = await categoryModel.allWithDetails();
//   res.locals.lcCategories = rows;
//   next();
// }