const router = require("express").Router()
const moment = require("moment")
const { getYear } = require("../utilities")
const database = require ("../database.json")
const {body,validationResult} = require("express-validator")
const { form_validators, upload_validators } = require("../middleware/validator")
const { writeDataBase } = require("../utilities")


router.get("/contacts",(req,res)=>{

    console.log("Richiesta /contacts")

    var err = ''
    if(req.query.err){
        err = "Manca l'oggetto"
    }
    res.render("../public/contact.ejs",{Titolo:"Contact",anno: getYear(),errore:err,pieces:database.data, moment:moment})

})

router.post("/contacts",form_validators,(req,res)=>{

    const errori = validationResult(req)
    if(errori.errors.length > 0){
        req.session.flash = errori.errors
        console.log(req.body)
        console.log("errore")
    }

    const entry = {
        email: req.body.mail,
        titolo: req.body.titolo,
        testo: req.body.testo,
    }

    // database.data.push(entry)
    // writeDataBase()

    req.session.flash = [{path:"success",msg:"Messaggio inviato"}]
    
    res.redirect("/contacts")
})


module.exports = router