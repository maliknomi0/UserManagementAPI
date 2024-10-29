const jwt = require('jsonwebtoken');

const AuthGuard = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.json({ status: 'failed' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.json({ status: 'failed' });
    }

    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
            return res.json({ status: 'failed' });
        }
        req.user = user;
        next();
    });
};

module.exports = AuthGuard;
