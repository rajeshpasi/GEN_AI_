const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'gen-ai-interview-seven.vercel.app', // Update this to match your frontend URL
  credentials: true, // Allow cookies to be sent with requests
}));

const authRouter = require('./routes/auth.routes');
const interviewRouter = require('./routes/interview.routes');



/** 
 * @route: Post /api/auth
 * @description: This is the main application file for the backend. It sets up the Express server, middleware, and routes.
 */
app.use('/api/auth', authRouter);

/**
 * @route: Post /api/interview
 * @description: This route is used for generating interview reports based on the candidate's resume, self-description, and job description. The interview report includes a match score, technical and behavioral questions, skill gaps, and a preparation plan. The report is generated using the Google Gemini AI model and follows a specific schema defined using Zod.
 * 
 */
app.use('/api/interview', interviewRouter);


module.exports = app;