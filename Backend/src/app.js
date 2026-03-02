const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/auth.routes');


/** 
 * @route: Post /api/auth
 * @description: This is the main application file for the backend. It sets up the Express server, middleware, and routes.
 */
app.use('/api/auth', authRouter);


module.exports = app;