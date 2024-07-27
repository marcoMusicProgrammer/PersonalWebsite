const { writeFileSync }  = require("fs")

const {musicData, movieData, electroacousticData, portfolioData, musicDatabase, movieDatabase, electroacousticDatabase, portfolioDatabase } = require("./config")

function getYear(){
    return  new Date().getFullYear()
}

function writeMusicDataBase(){
    try{
        writeFileSync(musicDatabase, JSON.stringify(musicData,null,2))
        console.log("database scritto correttamente")
    } catch (err) {
        console.error("Errore nella scrittura del database:", err)
    }
    
}

function writeVideoDataBase(){
    try{
        writeFileSync(movieDatabase, JSON.stringify(movieData,null,2))
        console.log("database scritto correttamente")
    } catch (err) {
        console.error("Errore nella scrittura del database:", err)
    }

}

function writeElectroacousticDataBase(){
    try{
        writeFileSync(electroacousticDatabase, JSON.stringify(electroacousticData,null,2))
        console.log("database scritto correttamente")
    } catch (err) {
        console.error("Errore nella scrittura del database:", err)
    }
}

function writePortfolioDataBase(){
    try{
        writeFileSync(portfolioDatabase, JSON.stringify(portfolioData,null,2))
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