const { writeFileSync }  = require("fs")
const musicDatabase = require("../../../../../data/musicDatabase.json")
const videoDatabase = require("../../../../../data/movieDatabase.json")
const electroacousticDatabase = require("../../../../../data/electroacousticDatabase.json")
const portfolioDatabase = require("../../../../../data/portfolioDatabase.json")

function getYear(){
    return  new Date().getFullYear()
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
        writeFileSync("../../../../../data/movieDatabase.json", JSON.stringify(videoDatabase,null,2))
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
    writeMusicDataBase,
    writeVideoDataBase,
    writeElectroacousticDataBase,
    writePortfolioDataBase

}