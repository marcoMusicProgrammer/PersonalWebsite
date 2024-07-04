const {getYear} = require("../utilities")
const router = require("express").Router()
const database = require("../../../../../data/database.json")
const musicDatabase = require ("../databases/musicDatabase.json")
const videoDatabase = require ("../databases/movieDatabase.json")
const electroacousticDatabase = require ("../databases/electroacousticDatabase.json")
const portfolioDatabase = require ("../databases/portfolioDatabase.json")



const moment = require("moment")



router.get("/",(req,res)=>{
    res.render("../public/home.ejs",{Titolo:"HOME",anno:getYear(),section8:"Help Us"})
    console.log("richiesta /Home")
}) 

router.get("/music",(req,res)=>{
    res.render("../public/music.ejs",{Titolo:"MUSIC",anno:getYear(),pieces:musicDatabase.data, moment:moment,filePieces:musicDatabase.data.files,videos:videoDatabase.data,electroacoustic:electroacousticDatabase.data})
    console.log("Richiesta /Bio")

})

router.get("/portfolio",(req,res)=>{
    res.render("../public/portfolio.ejs",{Titolo:"PORTFOLIO",anno: getYear(),files:portfolioDatabase.data,moment:moment})
    console.log("Eichiesta /Portoflio")
})

router.get("/response",(req,res)=>{
    res.render("../public/responses.ejs",{Titolo:"RESPONSES",anno: getYear(),resps:database.data,moment:moment})
    console.log("Eichiesta /Portoflio")
})

module.exports = router