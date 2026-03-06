const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // Update this to match your frontend URL
  credentials: true, // Allow cookies to be sent with requests
}));

const authRouter = require('./routes/auth.routes');


/** 
 * @route: Post /api/auth
 * @description: This is the main application file for the backend. It sets up the Express server, middleware, and routes.
 */
app.use('/api/auth', authRouter);


module.exports = app;