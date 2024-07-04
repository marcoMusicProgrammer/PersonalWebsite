const { writeFileSync }  = require("fs")
const database = require("../../../../../data/database.json")
const musicDatabase = require("../../../../../data/musicDatabase.json")
const videoDatabase = require("../../../../../data/movieDatabase.json")
const electroacousticDatabase = require("../../../../../data/electroacousticDatabase.json")
const portfolioDatabase = require("../../../../../data/portfolioDatabase.json")





function getYear(){
    return  new Date().getFullYear()
}

function writeDataBase(){
    try{
        writeFileSync("../../../../../data/database.json", JSON.stringify(database,null,2))
        console.log("database scritto correttamente")
    } catch (err) {
        console.error("Errore nella scrittura del database:", err)
    }
}

function writeMusicDataBase(){
    try{
        writeFileSync("../../../../../data/musicDatabase.json", JSON.stringify(musicDatabase,null,2))
        console.log("database scritto correttamente")
    } catch (err) {
        console.error("Errore nella scrittura del database:", err)
    }
    
}

function writeVideoDataBase(){
    try{
        writeFileSync("../../../../../data/videoDatabase.json", JSON.stringify(videoDatabase,null,2))
        console.log("database scritto correttamente")
    } catch (err) {
        console.error("Errore nella scrittura del database:", err)
    }

}

function writeElectroacousticDataBase(){
    try{
        writeFileSync("../../../../../data/electroacousticDatabase.json", JSON.stringify(electroacousticDatabase,null,2))
        console.log("database scritto correttamente")
    } catch (err) {
        console.error("Errore nella scrittura del database:", err)
    }
}

function writePortfolioDataBase(){
    try{
        writeFileSync("../../../../../data/portfolioDatabase.json", JSON.stringify(portfolioDatabase,null,2))
        console.log("database scritto correttamente")
    } catch (err) {
        console.error("Errore nella scrittura del database:", err)
    }
}


module.exports = {
    getYear,
    writeDataBase,
    writeMusicDataBase,
    writeVideoDataBase,
    writeElectroacousticDataBase,
    writePortfolioDataBase

}