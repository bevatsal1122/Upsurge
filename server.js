const express = require('express');
const path = require('path');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const connectDB = require('./config/database');
const router = require('./routes/index');

const PORT = process.env.PORT || 3000;
const app = express();
const rateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 1000,
    standardHeaders: true,
    legacyHeaders: false,
})

app.use(express.json());
app.use(rateLimiter);
app.use(express.static('public'));

// Database Connection
connectDB();

// Default Template Engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Routes
app.use('/', router);

app.listen(PORT, () => {
    console.log(`App Running at Port ${PORT}`);
});
