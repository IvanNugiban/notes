const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

class authService {
    async register({username, email, password}) {
        const candidateEmail = await User.findOne({email});
        const candidateUsername = await User.findOne({username});

        if (candidateUsername) throw new Error("This username is already taken");
        if (candidateEmail) throw new Error(`User with email ${email} already exist`);

        const hashedPassword = await bcrypt.hash(password, 2);

         await User.create({username, email, password: hashedPassword});
    }

    async login(isEmail, emailOrUsername, password) {
            let user;
            let typeOfLogin;
            if (isEmail.isEmpty()) {
                typeOfLogin = "email";
                user = await User.findOne({email: emailOrUsername});
            } else {
                typeOfLogin = "username";
                user = await User.findOne({username: emailOrUsername});
            }

            if (!user) throw new Error(`User with ${typeOfLogin} ${emailOrUsername} doesn't exist`);

            const isPasswordCorrect = await bcrypt.compareSync(password, user.password);
            if (!isPasswordCorrect) throw new Error("Password isn't correct");
            const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "30d"});
            return {
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
            }
        };
        async auth (id) {
            const user = await User.findById(id);
            return ({
                    id: user.id,
                    username: user.username,
                    email: user.email
            })
        }
}

module.exports = new authService();