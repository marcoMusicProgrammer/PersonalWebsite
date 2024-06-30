const { writeFileSync }  = require("fs")
const database = require("./database.json")
const musicDatabase = require("./musicDatabase.json")
const videoDatabase = require("./videoDatabase.json")
const electroacousticDatabase = require("./electroacousticDatabase.json")
const portfolioDatabase = require("./portfolioDatabase.json")





function getYear(){
    return  new Date().getFullYear()
}

function writeDataBase(){
    writeFileSync("./database.json", JSON.stringify(database,null,2))
}

function writeMusicDataBase(){
    writeFileSync("./musicDatabase.json", JSON.stringify(musicDatabase,null,2))
}

function writeVideoDataBase(){
    writeFileSync("./videoDatabase.json", JSON.stringify(videoDatabase,null,2))
}

function writeElectroacousticDataBase(){
    writeFileSync("./electroacousticDatabase.json", JSON.stringify(electroacousticDatabase,null,2))
}

function writePortfolioDataBase(){
    writeFileSync("./portfolioDatabase.json", JSON.stringify(portfolioDatabase,null,2))
}


module.exports = {
    getYear,
    writeDataBase,
    writeMusicDataBase,
    writeVideoDataBase,
    writeElectroacousticDataBase,
    writePortfolioDataBase

}