const {getYear} = require("../utilities")
const router = require("express").Router()
const { authenticate,login } = require('../middleware/auth.js');
const { musicData, movieData, electroacousticData, portfolioData } = require ("../config.js")

const moment = require("moment")



router.get("/",(req,res)=>{
    res.render("../public/home.ejs",{Titolo:"HOME",anno:getYear(),section8:"Help Us"})
    console.log("richiesta /Home")
}) 

router.get("/music",(req,res)=>{
    res.render("../public/music.ejs",{Titolo:"MUSIC",anno:getYear(),pieces:musicData.data, moment:moment,filePieces:musicData.data.files,videos:movieData.data,electroacoustic:electroacousticData.data})
    console.log("Richiesta /Music")

})

router.get("/portfolio",(req,res)=>{
    res.render("../public/portfolio.ejs",{Titolo:"PORTFOLIO",anno:getYear(),files:portfolioData.data,moment:moment})
    console.log("Richiesta /Portfolio")
})

// router.get("/login/response",authenticate,(req,res)=>{
//     res.render("../public/responses.ejs",{Titolo:"RESPONSES",anno:getYear(),resps:database.data,moment:moment})
//     console.log("Richiesta /Response")
// })

router.get("/login/music",(req,res)=>{
    res.render("../public/loginMusic.ejs",{Titolo:"MUSIC",anno:getYear(),pieces:musicData.data, moment:moment,filePieces:musicData.data.files,videos:movieData.data,electroacoustic:electroacousticData.data})
    console.log("Richiesta /Admin Music")

})

router.get("/login/portfolio",(req,res)=>{
    res.render("../public/loginPortfolio.ejs",{Titolo:"PORTFOLIO",anno:getYear(),files:portfolioData.data,moment:moment})
    console.log("Richiesta /Login Portfolio")
})

module.exports = router