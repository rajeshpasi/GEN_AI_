const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const blackListModel = require('../models/blackList.model');

const authUser = async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization?.startsWith('Bearer ')
            ? req.headers.authorization.split(' ')[1]
            : null;

        const token = req.cookies?.token || bearerToken;

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const isBlacklisted = await blackListModel.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};


module.exports = authUser;