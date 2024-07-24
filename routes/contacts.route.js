const router = require("express").Router()
const moment = require("moment")
const { getYear } = require("../utilities")
const {body,validationResult} = require("express-validator")
const { form_validators } = require("../middleware/validator")
const { writeDataBase } = require("../utilities")
const nodemailer = require("nodemailer")
require('dotenv').config();


router.get("/contacts",(req,res)=>{

    console.log("Richiesta /contacts")
    res.render("../public/contact.ejs",{Titolo:"Contact",anno: getYear()})

})

router.post("/contacts",form_validators,async (req,res)=>{
    const errori = validationResult(req)

    if(errori.errors.length > 0){
        req.session.flash = errori.errors
        console.log(errori.errors)
        return res.redirect("/contacts")

    }

    const { mail,titolo, testo } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',  // Può essere 'hotmail' o 'outlook'
        host: 'smtp.gmail.com',  // Host per Outlook
        port: 587,  // Porta per TLS
        secure: false,  // Se false, utilizza STARTTLS
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS // Utilizza la password specifica per l'applicazione
        }
    })

    const mailOptions = {
        from: process.env.EMAIL_USER,  // L'email dal quale viene inviato il messaggio
        to: "marco.maisto@hotmail.it",
        replyTo: mail,                 // Indirizzo a cui rispondere
        subject: titolo,
        text: `Email da: ${mail}\n\nMessaggio:\n${testo}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email inviata con successo');
        req.session.flash = [{ path: "success", msg: "Messaggio inviato con successo." }];
        // res.redirect("/contacts");

    } catch (error) {
        console.error('Errore nell\'invio dell\'email:', error);
        req.session.flash = [{ path: "mailErrSend", msg: "Mail non inviata, riprovare." }];
    } finally {
        if (!res.headersSent) { // Assicurati che le intestazioni non siano già state inviate
            res.redirect("/contacts");
        }
    }
})


module.exports = router