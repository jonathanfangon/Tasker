module.exports = (req, res, next) => {
    const { name, password } = req.body;

    if(req.path === '/register') {
        if(![name, password].every(Boolean)) {
            return res.status(401).json('Missing credentials.');
        }
    } else if(req.path === '/login') {
        if(![name, password].every(Boolean)) {
            return res.status(401).json('Missing credentials.');
        }
    }

    next();
}