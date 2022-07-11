const Router = require("express");
const {body} = require('express-validator');
const router = new Router();
const authMiddleware = require('../middleware/auth.middleware');
const authController = require('../controllers/authController');

router.post('/registration',
    body("username").isLength({min: 4, max: 14}).not().isEmail(),
    body("email").isEmail(),
    body("password").isLength({min: 4, max: 14}),
    authController.register
)
;

router.post('/login',
    body("emailOrUsername").isEmail(),
    authController.login
)

router.get('/auth', authMiddleware, authController.auth);


module.exports = router;