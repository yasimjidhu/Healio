const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registration
const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Assign role
        const role = email == '@admin@gmail.com'  ? 'admin' : 'doctor';

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ username, email, password: hashedPassword, role });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully',user:newUser });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Registration failed', error });
    }
};

// Login
const login = async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        // Find the user by username
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create a JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.TOKEN_SECRET,
            { expiresIn: '1h' }
        );

        // Set the token as a cookie in the response
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            maxAge: 24 * 60 * 60 * 1000 
        });

        return res.status(200).json({ message: 'Login successful', token,user });
    } catch (error) {
        console.error(error); 
        return res.status(500).json({ message: 'Login failed', error: error.message }); 
    }
};



module.exports = { register, login };
