const { validationResult } = require("express-validator")
const path = require('path')
const { baseDataDir, electroacousticDatabase, movieDatabase, musicDatabase, portfolioDatabase} = require("../config.js")
const { writeMusicDataBase,writeVideoDataBase,writeElectroacousticDataBase,writePortfolioDataBase } = require("../utilities")
const electroacousticData = require(electroacousticDatabase)
const musicData = require(musicDatabase)
const movieData = require(movieDatabase)
const portfolioData = require(portfolioDatabase)


const convertToRelativePath = (absolutePath) => {
    const relativePath = path.relative(baseDataDir, absolutePath);
    return path.join('data', relativePath).replace(/\//g, '\\');
};


const workCreateMusic = (req,res)=>{
    const errors = validationResult(req)

    if(errors.errors.length > 0){
        req.session.flash = errors.errors
        console.log(errors.errors)
        return res.redirect("/login/upload")

    }else if(!req.files.file || !req.files.image){
        if(!req.files.file && !req.files.image){
            req.session.flash = [{path:"file",msg:"No files selected"},{path:"image",msg:"No files selected"}]
            console.log(req.session.flash)

            return res.redirect("/login/upload")

        }else if(!req.files.file){
            req.session.flash = [{path:"file",msg:"No files selected"}]
            console.log(req.session.flash)

            return res.redirect("/login/upload")

        }else if(!req.files.image){
            req.session.flash = [{path:"image",msg:"No files selected"}]
            console.log(req.session.flash)

            return res.redirect("/login/upload")

        }else{
            return res.redirect("/login/upload")
        }
    }
    
    const desiredPathImage = convertToRelativePath(req.files.image[0].path);
    console.log("Desired Path Music:", desiredPathImage); // Controlla che il percorso relativo sia corretto

    const entry = {
        title: req.body.musicTitle,
        venue: req.body.musicVenue,
        premiere: new Date(req.body.musicPremiere).toISOString(),
        description: req.body.description,
        image: desiredPathImage,
        files: []
    }

    req.files.file.forEach(file => {
        const desiredPathFiles = convertToRelativePath(file.path);
        entry.files.push({ file: desiredPathFiles });
    });

    musicData.data.push(entry)
    writeMusicDataBase()

	req.session.flash = [{path: "music-success", msg: "Upload succeded"}]

	res.redirect("/login/upload")
}

const workCreateVideo = (req,res)=>{
    const errors = validationResult(req)

    if(errors.errors.length > 0){
        req.session.flash = errors.errors
        return res.redirect("/login/upload")

    }else if(!req.file) {
        
        req.session.flash = [{path:"video",msg:"No files selected"}]
        console.log(req.session.flash)

        return res.redirect("/login/upload")
    }

    const desiredPath = convertToRelativePath(req.file.path);
    console.log("Desired Path-Movie:", desiredPath); // Controlla che il percorso relativo sia corretto

    const entryVideo = {
        title: req.body.movieTitle,
        venue: req.body.movieVenue,
        premiere: new Date(req.body.moviePremiere).toISOString(),
        description: req.body.description,
        video: desiredPath,
    }

    movieData.data.push(entryVideo)
    writeVideoDataBase()

	req.session.flash = [{path: "movie-success", msg: "Upload succeded"}]

	res.redirect("/login/upload")
}

const workCreateElectroacoustic = (req,res)=>{
    const errors = validationResult(req)

    if(errors.errors.length > 0){
        req.session.flash = errors.errors
        return res.redirect("/login/upload")

    }else if(!req.file) {
        
        req.session.flash = [{path:"electroacoustic-piece",msg:"No files selected"}]
        console.log(req.session.flash)

        return res.redirect("/login/upload")
    }

    console.log(req.file.path)

    const desiredPath = convertToRelativePath(req.file.path);
    console.log("Desired Path-electroacoustic:", desiredPath); // Controlla che il percorso relativo sia corretto

    const entryVideo = {
        title: req.body.elTitle,
        venue: req.body.elVenue,
        premiere: new Date(req.body.elPremiere).toISOString(),
        description: req.body.description,
        piece: desiredPath
    }


    electroacousticData.data.push(entryVideo)
    writeElectroacousticDataBase()

	req.session.flash = [{path: "el-success", msg: "Upload succeded"}]

	res.redirect("/login/upload")
}

const workCreatePortfolio = (req,res)=>{
    const errors = validationResult(req)

    if(errors.errors.length > 0){
        req.session.flash = errors.errors
        console.log(errors.errors)
        return res.redirect("/login/upload")

    }else if(!req.file ) {
        
        req.session.flash = [{path:"portfolio",msg:"No files selected"}]
        console.log(req.session.flash)

        return res.redirect("/login/upload")
    }
   

    const desiredPath = convertToRelativePath(req.file.path);
    console.log("Desired Path-electroacoustic:", desiredPath); // Controlla che il percorso relativo sia corretto

    const entryVideo = {
        id: req.body.portfolioId,
        title: req.body.portfolioTitle,
        description: req.body.description,
        work:desiredPath,
    }

    portfolioData.data.push(entryVideo)
    writePortfolioDataBase()

	req.session.flash = [{path: "portfolio-success", msg: "Upload succeded"}]

	res.redirect("/login/upload")
}


module.exports = {
    workCreateMusic,
    workCreateVideo,
    workCreateElectroacoustic,
    workCreatePortfolio
}