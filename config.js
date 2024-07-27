const path = require('path');

// Imposta la directory base per i dati
const baseDataDir = path.resolve(__dirname, '../../../../../data');
const musicDatabase = path.join(baseDataDir, 'musicDatabase.json');
const electroacousticDatabase = path.join(baseDataDir, 'electroacousticDatabase.json');
const movieDatabase = path.join(baseDataDir, 'movieDatabase.json');
const portfolioDatabase = path.join(baseDataDir, 'portfolioDatabase.json');

const musicData = require("../../../../../data/musicDatabase.json")
const movieData = require("../../../../../data/movieDatabase.json")
const electroacousticData = require("../../../../../data/electroacousticDatabase.json")
const portfolioData = require("../../../../../data/portfolioDatabase.json")

module.exports = {
    baseDataDir,
    musicDatabase,
    electroacousticDatabase,
    movieDatabase,
    portfolioDatabase,
    musicData,
    movieData,
    electroacousticData,
    portfolioData
};