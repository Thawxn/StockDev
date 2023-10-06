exports.middlewareGlobal = (req, res, next) => {
    res.locals.err = req.flash('err');  
    res.locals.success = req.flash('success');  
    next();
}