const express = require('express');
const authUser = require('../middlewares/auth.middleware');
const InterViewController  = require('../controllers/interview.controller');
const upload = require('../middlewares/file.middleware');

const interviewRouter = express.Router();


/**
 * @routes POST /api/interview
 * @description This route is used for generating interview reports based on the candidate's resume, self-description, and job description. The interview report includes a match score, technical and behavioral questions, skill gaps, and a preparation plan. The report is generated using the Google Gemini AI model and follows a specific schema defined using Zod.
 * @access Private (authentication required)
 */

interviewRouter.post('/', authUser, upload.single('resume'), InterViewController.generateInterViewReportController);

/**
 * @route GET /api/interview/report/:interviewId
 * @description get interview report by interviewId.
 * @access private
 */
interviewRouter.get("/report/:interviewId", authUser, InterViewController.getInterviewReportByIdController)


/**
 * @route GET /api/interview/
 * @description get all interview reports of logged in user.
 * @access private
 */
interviewRouter.get("/", authUser, InterViewController.getAllInterviewReportsController)


/**
 * @route GET /api/interview/resume/pdf
 * @description generate resume pdf on the basis of user self description, resume content and job description.
 * @access private
 */
interviewRouter.post("/resume/pdf/:interviewReportId", authUser, InterViewController.generateResumePdfController)


module.exports = interviewRouter;