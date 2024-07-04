'use strict'

const http = require ("http") 
const express = require("express") 
const app = express() //Inizializza l'applicazione
const fs = require("fs")

const bodyParser  = require("body-parser")
const session = require("cookie-session")
const flashMiddleWare = require("./middleware/flash.js")

const path = require("path")
const ws = require("ws")
const cors = require("cors")
const helmet = require('helmet');

const server = http.createServer(app)
const PORT = process.env.PORT || 10002


// const wsServer = new ws.Server({server})

// wsServer.on("connection", (socket)=>{
//     console.log("A new user connected")
// })

const dataPath = path.resolve(__dirname, '../../../../../../data'); // Adjust this path as needed
const databaseContact = path.join(dataPath, 'database.json');
const databaseMusic = path.join(dataPath, 'musicDatabase.json');
const databaseElectroacoustic = path.join(dataPath, 'electroacousticDtabase.json');
const databaseMovie = path.join(dataPath, 'movieDatabase.json');
const databasePortfolio = path.join(dataPath, 'portfolioDatabase.json');


if (!fs.existsSync(databaseContact)) {
    fs.writeFileSync(databaseContact, JSON.stringify({ data: [] }, null, 2));
}
if (!fs.existsSync(databaseMusic)) {
    fs.writeFileSync(databaseMusic, JSON.stringify({ data: [] }, null, 2));
}
if (!fs.existsSync(databaseElectroacoustic)) {
    fs.writeFileSync(databaseElectroacoustic, JSON.stringify({ data: [] }, null, 2));
}
if (!fs.existsSync(databaseMovie)) {
    fs.writeFileSync(databaseMovie, JSON.stringify({ data: [] }, null, 2));
}
if (!fs.existsSync(databasePortfolio)) {
    fs.writeFileSync(databasePortfolio, JSON.stringify({ data: [] }, null, 2));
}

app.use(express.static(__dirname+"/public"))
app.use('/data', express.static(path.join(__dirname, 'data')));
app.set("view engine","ejs")
app.use("/api",cors())


app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
    secret: "prova",
    resave: false,
    saveUninitialized: true,
    cookie: {
        sameSite: "strict"
    }
}))

app.use(flashMiddleWare)

const staticRoutes = require ("./routes/static.route.js")
const apiRoutes = require ("./routes/api.route.js")
const contactRoutes = require ("./routes/contacts.route.js")
const servicesRouter = require("./routes/services.route.js")
const worksRouter = require("./routes/works.route.js")
const loginRouter = require("./routes/auth.route.js")


app.use(staticRoutes)
app.use(apiRoutes)
app.use(contactRoutes)
app.use(servicesRouter)
app.use(worksRouter)
app.use(loginRouter)




// costruire pacchetto da mandare per la riproduzione di un file audio sul web

server.listen(PORT,()=>{
    console.log(`Server Listening on port  + ${PORT}`)
})

//comando per far partire: npm run devel