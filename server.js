'use strict';

const http = require("http");
const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const session = require("cookie-session");
const flashMiddleWare = require("./middleware/flash.js");
const path = require("path");
const cors = require("cors");
const helmet = require('helmet');
const ws = require("ws");

const server = http.createServer(app);
const PORT = process.env.PORT || 1000;

// Leggi il file nodemon.json per ottenere i percorsi dei database
const nodemonConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'nodemon.json'), 'utf8'));
const { baseDataDir, musicDatabase, movieDatabase, electroacousticDatabase, portfolioDatabase } = nodemonConfig.databasePaths;

const resolvedBaseDataDir = path.resolve(__dirname, baseDataDir);
const resolvedMusicDatabase = path.resolve(__dirname, musicDatabase);
const resolvedMovieDatabase = path.resolve(__dirname, movieDatabase);
const resolvedElectroacousticDatabase = path.resolve(__dirname, electroacousticDatabase);
const resolvedPortfolioDatabase = path.resolve(__dirname, portfolioDatabase);

if (!fs.existsSync(resolvedBaseDataDir)) {
    fs.mkdirSync(resolvedBaseDataDir, { recursive: true });
}

if (!fs.existsSync(resolvedMusicDatabase)) {
    fs.writeFileSync(resolvedMusicDatabase, JSON.stringify({ data: [] }, null, 2));
}
if (!fs.existsSync(resolvedElectroacousticDatabase)) {
    fs.writeFileSync(resolvedElectroacousticDatabase, JSON.stringify({ data: [] }, null, 2));
}
if (!fs.existsSync(resolvedMovieDatabase)) {
    fs.writeFileSync(resolvedMovieDatabase, JSON.stringify({ data: [] }, null, 2));
}
if (!fs.existsSync(resolvedPortfolioDatabase)) {
    fs.writeFileSync(resolvedPortfolioDatabase, JSON.stringify({ data: [] }, null, 2));
}

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use('/data', express.static(resolvedBaseDataDir));
app.set("view engine", "ejs");
app.use("/api", cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: "prova",
    resave: false,
    saveUninitialized: true,
    cookie: {
        sameSite: "strict"
    }
}));

app.use(flashMiddleWare);

const staticRoutes = require("./routes/static.route.js");
const apiRoutes = require("./routes/api.route.js");
const contactRoutes = require("./routes/contacts.route.js");
const servicesRouter = require("./routes/services.route.js");
const worksRouter = require("./routes/works.route.js");
const loginRouter = require("./routes/auth.route.js");
const deleteRouter = require("./routes/delete.route.js");

app.use(staticRoutes);
app.use(apiRoutes);
app.use(contactRoutes);
app.use(servicesRouter);
app.use(worksRouter);
app.use(loginRouter);
app.use(deleteRouter);

server.listen(PORT, () => {
    console.log(`Server Listening on port ${PORT}`);
});

//comando per far partire: npm run devel
