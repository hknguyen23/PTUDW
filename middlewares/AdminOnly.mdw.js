module.exports = (req, res, next) => {
    if (res.locals.isAuthenticated === false){
		return res.redirect(`/login?retUrl=${req.originalUrl}`);
	}
	else {
		if (res.locals.authUser.Loai !== 3){
			return res.redirect(`/`);
		}
	}
    next();
}