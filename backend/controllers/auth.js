const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const { generateCode, saveCode, verifyCode } = require('../services/verification');
const { sendVerificationEmail, isSmtpConfigured } = require('../services/email');

const JWT_SECRET = process.env.JWT_SECRET || 'xisekelo-safety-secret-key-change-in-production';

const pool = new Pool({
  user: process.env.DB_USER || 'xisekelo',
  host: process.env.DB_HOST || '10.0.0.65',
  database: process.env.DB_NAME || 'xisekelo',
  password: process.env.DB_PASSWORD || 'pass123',
  port: process.env.DB_PORT || 5432,
});

const sendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;
    const normalizedEmail = String(email || '').trim().toLowerCase();

    if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return res.status(400).json({ message: 'A valid email address is required' });
    }

    const existingUser = await pool.query('SELECT id FROM users WHERE LOWER(email) = $1', [normalizedEmail]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'An account with this email already exists' });
    }

    const code = generateCode();
    saveCode(normalizedEmail, code);

    const result = await sendVerificationEmail(normalizedEmail, code);
    const payload = {
      message: result.sent
        ? 'Verification code sent to your email'
        : 'Verification code generated (check server console if email is not configured)',
    };

    if (result.devMode && process.env.NODE_ENV !== 'production') {
      payload.devCode = code;
    }

    res.json(payload);
  } catch (error) {
    console.error('Send verification code error:', error);
    res.status(500).json({ message: 'Could not send verification code. Try again later.' });
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password, code } = req.body;
    const normalizedEmail = String(email || '').trim().toLowerCase();

    if (!name || !normalizedEmail || !password || !code) {
      return res.status(400).json({ message: 'Name, email, password and verification code are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const verification = verifyCode(normalizedEmail, code);
    if (!verification.ok) {
      return res.status(400).json({ message: verification.message });
    }

    const existingUser = await pool.query('SELECT * FROM users WHERE LOWER(email) = $1', [normalizedEmail]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
      [name.trim(), normalizedEmail, hashedPassword, 'customer']
    );

    const user = result.rows[0];

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Account created — email verified',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const result = await pool.query('SELECT * FROM users WHERE LOWER(email) = LOWER($1)', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result.rows[0];

    const passwordField = user.password_hash || user.password;
    const isValidPassword = await bcrypt.compare(password, passwordField);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const result = await pool.query(
      'SELECT id, name, email, role FROM users WHERE id = $1',
      [decoded.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user: result.rows[0] });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = {
  sendVerificationCode,
  register,
  login,
  getCurrentUser,
};
