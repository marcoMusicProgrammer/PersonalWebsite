const { writeFile } = require("fs").promises;
const path = require("path");

const database = require("./databases/database.json");
const musicDatabase = require("./databases/musicDatabase.json");
const videoDatabase = require("./databases/videoDatabase.json");
const electroacousticDatabase = require("./databases/electroacousticDatabase.json");
const portfolioDatabase = require("./databases/portfolioDatabase.json");

function getYear() {
  return new Date().getFullYear();
}

async function writeDataBase() {
  try {
    await writeFile(path.join(__dirname, "./databases/database.json"), JSON.stringify(database, null, 2));
    console.log("Database scritto correttamente");
  } catch (err) {
    console.error("Errore nella scrittura del database:", err);
  }
}

async function writeMusicDataBase() {
  try {
    await writeFile(path.join(__dirname, "./databases/musicDatabase.json"), JSON.stringify(musicDatabase, null, 2));
    console.log("MusicDatabase scritto correttamente");
  } catch (err) {
    console.error("Errore nella scrittura del musicDatabase:", err);
  }
}

async function writeVideoDataBase() {
  try {
    await writeFile(path.join(__dirname, "./databases/videoDatabase.json"), JSON.stringify(videoDatabase, null, 2));
    console.log("VideoDatabase scritto correttamente");
  } catch (err) {
    console.error("Errore nella scrittura del videoDatabase:", err);
  }
}

async function writeElectroacousticDataBase() {
  try {
    await writeFile(path.join(__dirname, "./databases/electroacousticDatabase.json"), JSON.stringify(electroacousticDatabase, null, 2));
    console.log("ElectroacousticDatabase scritto correttamente");
  } catch (err) {
    console.error("Errore nella scrittura del electroacousticDatabase:", err);
  }
}

async function writePortfolioDataBase() {
  try {
    await writeFile(path.join(__dirname, "./databases/portfolioDatabase.json"), JSON.stringify(portfolioDatabase, null, 2));
    console.log("PortfolioDatabase scritto correttamente");
  } catch (err) {
    console.error("Errore nella scrittura del portfolioDatabase:", err);
  }
}

module.exports = {
  getYear,
  writeDataBase,
  writeMusicDataBase,
  writeVideoDataBase,
  writeElectroacousticDataBase,
  writePortfolioDataBase
};
