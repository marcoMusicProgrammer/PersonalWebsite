const { writeFileSync }  = require("fs")
const database = require("./databases/database.json")
const musicDatabase = require("./databases/musicDatabase.json")
const videoDatabase = require("./databases/videoDatabase.json")
const electroacousticDatabase = require("./databases/electroacousticDatabase.json")
const portfolioDatabase = require("./databases/portfolioDatabase.json")





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