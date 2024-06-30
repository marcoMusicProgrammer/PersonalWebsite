const router = require("express").Router()
const { getYear } = require("../utilities")
const { authenticate,login } = require('../middleware/auth.js');
const {  login_validators } = require("../middleware/validator")
const {validationResult} = require("express-validator")




router.get('/login',(req,res) =>{
    var err = ''
    if(req.query.err){
        err = "Manca l'oggetto"
    }
    res.render("../public/login.ejs",{errore:err})
})

router.post('/login',login_validators,login)


module.exports = router