const bcrypt = require('bcrypt')
const { validationResult } = require("express-validator")

const login = (req, res, next) => {

    const { password } = req.body; // Assumi che la password venga inviata tramite POST
    
    bcrypt.compare(password, process.env.LOGIN_PASS, (err, result) => {
        if (err) {
            console.error(err);
            return res.redirect('/login');
        }

        if (result) {
            req.session.isAuthenticated = true;
            console.log("Login avvenuto con successo.");
            res.redirect('/login/upload');
        } else {
            console.log("Credenziali non corrette.");
            req.session.flash = [{path:"password",msg:"Wrong password"}]
            console.log(req.session.flash)

            res.redirect('/login');
        }
    });
};

const authenticate = (req, res, next) => {
    if (req.session && req.session.isAuthenticated) {
        return next();
    } else {
        res.redirect('/login');
    }
};

module.exports = {
    authenticate,
    login
};