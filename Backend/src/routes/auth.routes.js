const {Router} = require('express');

const authRouter = Router();

const authController = require('../controllers/auth.controller');
const authUser = require('../middlewares/auth.middleware');

/** 
 * @route - POST /api/auth/register
 * @description: This route handles user registration. It expects a JSON body with 'username', 'email', and 'password' fields. The controller will handle the logic for creating a new user, hashing the password, and saving it to the database.
 * @returns: A JSON response indicating success or failure of the registration process.
 * @access: Public (no authentication required)
 */
authRouter.post('/register', authController.register);

/**
 * @route - POST /api/auth/login
 * @description: This route handles user login. It expects a JSON body with 'email' and 'password' fields. The controller will handle the logic for verifying the user's credentials, generating a JWT token if the login is successful, and returning it in the response.
 * @access: Public (no authentication required)
 */
authRouter.post('/login', authController.login);


/**
 * @route - GET /api/auth/logout
 * @description: Clear Cookie and add the token to the blacklist. The controller will handle the logic for invalidating the user's session by clearing the authentication cookie and adding the token to a blacklist to prevent further use.
 * @access: Public (no authentication required)
 */
authRouter.get('/logout', authController.logout);

/**
 * @route - GET /api/auth/get-profile
 * @description: This route is a protected route that requires authentication. It will return the user's profile information if the provided JWT token is valid and not blacklisted.
 * @access: Private (authentication required)
 */
authRouter.get('/get-profile', authUser, authController.getProfile);

module.exports = authRouter;