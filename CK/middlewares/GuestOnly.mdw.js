module.exports = (req, res, next) => {
    if (req.session.isAuthenticated === true)
      return res.redirect(`/`);
    next();
  }
  