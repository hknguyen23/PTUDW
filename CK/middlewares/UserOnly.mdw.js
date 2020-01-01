module.exports = (req, res, next) => {
    if (res.locals.isAuthenticated === false)
        return res.redirect(`/login?retUrl=${req.originalUrl}`);

    next();
}