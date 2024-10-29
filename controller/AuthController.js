const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../database');

// Helper function to generate a JWT
const generateToken = (user) => {
    return jwt.sign(
        { userId: user.id, email: user.email, fullName: user.fullName, role: user.role },
        process.env.SECRET || 'Skey'
    );
};

// Signup Method
exports.signup = async (req, res) => {
    const { email, phoneNumber, password, fullName, dateOfBirth, gender, admin, address, avatar } = req.body;

    // Basic required fields check
    if (!email || !phoneNumber || !password || !fullName || password.length < 6) {
        return res.json({ status: 'failed' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.json({ status: 'failed' });

    const newUser = await User.create({
        email,
        phoneNumber,
        password: await bcrypt.hash(password, 10),
        fullName,
        dateOfBirth: dateOfBirth || null,
        gender: gender || null,
        address: address || null,
        role: admin ? 'admin' : 'user',
        avatar: avatar || null,
    });

    res.json({ status: 'success', token: generateToken(newUser), user: newUser });
};

// Login Method
exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.json({ status: 'failed' });

    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.json({ status: 'failed' });
    }

    res.json({ status: 'success', token: generateToken(user), user });
};

// Edit User Profile
exports.editUserProfile = async (req, res) => {
    const { fullName, phoneNumber, dateOfBirth, gender, address, avatar } = req.body;
    const user = await User.findByPk(req.user.userId);
    if (!user) return res.json({ status: 'failed' });

    await user.update({
        fullName: fullName || user.fullName,
        phoneNumber: phoneNumber || user.phoneNumber,
        dateOfBirth: dateOfBirth || user.dateOfBirth,
        gender: gender || user.gender,
        address: address || user.address,
        avatar: avatar || user.avatar,
    });

    res.json({ status: 'success', user });
};

// Change Password Method
exports.changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!newPassword || newPassword.length < 6) {
        return res.json({ status: 'failed' });
    }

    const user = await User.findByPk(req.user.userId);
    if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
        return res.json({ status: 'failed' });
    }

    await user.update({ password: await bcrypt.hash(newPassword, 10) });
    res.json({ status: 'success' });
};
