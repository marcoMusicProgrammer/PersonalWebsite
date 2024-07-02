const bcrypt = require('bcrypt')
const { validationResult } = require("express-validator")

// var adminPasswordHash = '$2b$10$AzUbIlxkWezOBek3TCiMNOYm5F8jCQSU4Z..e1CefwQyxMwry3blq';
const adminPasswordHash = require("../databases/credenziali.json")

// const someOtherPlaintextPassword = 'not_bacon';
// const saltRounds = 10; // Il numero di salt da applicare


// bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(`Hashed password: ${hash}`);
//         adminPasswordHash == hash
//     }
// });

// bcrypt.genSalt(saltRounds, function(err, salt) {
//     bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
//         if (err) {
//             console.error(err);
//         } else {
//             console.log(`Hashed password: ${hash}`);
//             adminPasswordHash = hash; // Assegna il nuovo hash generato a adminPasswordHash

//             // Dopo aver assegnato l'hash, esegui la comparazione
//             bcrypt.compare(myPlaintextPassword, adminPasswordHash, function(err, result) {
//                 if (err) {
//                     console.error(err);
//                 } else {
//                     console.log(`Passwords match: ${result}`);
//                 }
//             });
//         }
//     });
// });

console.log()

const login = (req, res, next) => {
    // const errors = validationResult(req)
    // console.log(errors)
    // if(errors.errors.length > 0){
    //     req.session.flash = errors.errors
    //     console.log(errors.errors)
    //     return res.redirect("/login")
    // }

    const { password } = req.body; // Assumi che la password venga inviata tramite POST
    
    bcrypt.compare(password, adminPasswordHash.data[0].passwordHash, (err, result) => {
        if (err) {
            console.error(err);
            return res.redirect('/login');
        }

        if (result) {
            req.session.isAuthenticated = true;
            console.log("Login avvenuto con successo.");
            res.redirect('/upload');
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