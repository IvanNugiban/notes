const {validationResult} = require("express-validator");
const authService = require("../services/authService")

class authController {
    async register(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json("Check the correctness of the data");
            }
            await authService.register(req.body);
            return res.json("Registration successful");
        } catch (e) {
            res.status(403).json(e.message);
        }
    }

    async login(req, res) {
        try {
            const isEmail = validationResult(req);
            const {emailOrUsername, password} = req.body;
            const result = await authService.login(isEmail, emailOrUsername, password);
            return res.json({...result});
        } catch (e) {
            res.status(401).json(e.message)
        }
    }

    async auth(req, res) {
        try {
            const user = await authService.auth(req.user.id);
            return res.json({...user});
        } catch (e) {
            res.status(500).json("Server error");
        }
    }
}

module.exports = new authController();