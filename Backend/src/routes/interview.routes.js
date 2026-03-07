const express = require('express');
const authUser = require('../middlewares/auth.middleware');

const interviewRouter = express.Router();


/**
 * @routes POST /api/interview
 * @description This route is used for generating interview reports based on the candidate's resume, self-description, and job description. The interview report includes a match score, technical and behavioral questions, skill gaps, and a preparation plan. The report is generated using the Google Gemini AI model and follows a specific schema defined using Zod.
 * @access Private (authentication required)
 */

interviewRouter.post('/', authUser)

module.exports = interviewRouter;