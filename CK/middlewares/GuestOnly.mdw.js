module.exports = (req, res, next) => {
    if (res.locals.isAuthenticated === true)
      return res.redirect(`/`);
    next();
}
  