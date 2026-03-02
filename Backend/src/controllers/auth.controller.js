const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const blackListModel = require('../models/blackList.model');




const register = async (req, res) => {

    const { username, email, password } = req.body;

    if(!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await userModel.findOne({ $or: [{email},{username}] });
    if(existingUser && existingUser.username === username) {
        return res.status(400).json({ message: 'this username already exists' });
    }
    if(existingUser && existingUser.email === email){
        return res.status(400).json({ message: 'this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);


        const user = await userModel.create({
            username,
            email,
            password: hashedPassword
        });

        const token = jwt.sign(
            { 
                id: user._id,
                username: user.username
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.cookie('token', token);

        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
}

const login = async (req, res) => {
    const {email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await userModel.findOne({ email });
    if(!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
        { 
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' });

        res.cookie('token', token)

        return res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            },
            token
        });
}


const logout = async (req, res) => {
    const token = req.cookies.token;
    if(token) {
        await blackListModel.create({token});
    }
    res.clearCookie('token');
    return res.status(200).json({ message: 'Logout successful' });
}


const getProfile = async (req, res) => {
    const user = req.user;
    return res.status(200).json({
        message: 'Profile retrieved successfully',
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}

module.exports = {
    register,
    login,
    logout,
    getProfile
}