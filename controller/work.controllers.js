const { validationResult } = require("express-validator")
const musicDatabase = require ("../databases/musicDatabase.json")
const videoDatabase = require ("../databases/videoDatabase.json")
const electroacousticDatabase = require ("../databases/electroacousticDatabase.json")
const portfolioDatabase = require ("../databases/portfolioDatabase.json")
const { writeMusicDataBase,writeVideoDataBase,writeElectroacousticDataBase,writePortfolioDataBase } = require("../utilities")


const workCreateMusic = (req,res)=>{
    const errors = validationResult(req)

    if(errors.errors.length > 0){
        req.session.flash = errors.errors
        console.log(errors.errors)
        return res.redirect("/upload")

    }else if(!req.files.file || !req.files.image){
        if(!req.files.file && !req.files.image){
            req.session.flash = [{path:"file",msg:"No files selected"},{path:"image",msg:"No files selected"}]
            console.log(req.session.flash)

            return res.redirect("/upload")

        }else if(!req.files.file){
            req.session.flash = [{path:"file",msg:"No files selected"}]
            console.log(req.session.flash)

            return res.redirect("/upload")

        }else if(!req.files.image){
            req.session.flash = [{path:"image",msg:"No files selected"}]
            console.log(req.session.flash)

            return res.redirect("/upload")

        }else{
            return res.redirect("/upload")
        }
    }

    const entry = {
        title: req.body.musicTitle,
        venue: req.body.musicVenue,
        premiere: new Date(req.body.musicPremiere).toISOString(),
        description: req.body.description,
        image: req.files.image[0].path,
        files: []
    }

    req.files.file.forEach(file => {
        entry.files.push({ file: file.path });
    });

    console.log(req.files.file.length)

    musicDatabase.data.push(entry)
    // writeMusicDataBase()

	req.session.flash = [{path: "music-success", msg: "Upload succeded"}]

	res.redirect("/upload")
}

const workCreateVideo = (req,res)=>{
    const errors = validationResult(req)

    if(errors.errors.length > 0){
        req.session.flash = errors.errors
        return res.redirect("/upload")

    }else if(!req.file) {
        
        req.session.flash = [{path:"video",msg:"No files selected"}]
        console.log(req.session.flash)

        return res.redirect("/upload")
    }

    const entryVideo = {
        title: req.body.movieTitle,
        venue: req.body.movieVenue,
        premiere: new Date(req.body.moviePremiere).toISOString(),
        description: req.body.description,
        video: req.file.path,
    }

    videoDatabase.data.push(entryVideo)
    // writeVideoDataBase()

	req.session.flash = [{path: "movie-success", msg: "Upload succeded"}]

	res.redirect("/upload")
}

const workCreateElectroacoustic = (req,res)=>{
    const errors = validationResult(req)

    if(errors.errors.length > 0){
        req.session.flash = errors.errors
        return res.redirect("/upload")

    }else if(!req.file) {
        
        req.session.flash = [{path:"electroacoustic-piece",msg:"No files selected"}]
        console.log(req.session.flash)

        return res.redirect("/upload")
    }

    const entryVideo = {
        title: req.body.elTitle,
        venue: req.body.elVenue,
        premiere: new Date(req.body.elPremiere).toISOString(),
        description: req.body.description,
        piece: req.file.path,
    }


    electroacousticDatabase.data.push(entryVideo)
    // writeElectroacousticDataBase()

	req.session.flash = [{path: "el-success", msg: "Upload succeded"}]

	res.redirect("/upload")
}

const workCreatePortfolio = (req,res)=>{
    const errors = validationResult(req)

    if(errors.errors.length > 0){
        req.session.flash = errors.errors
        console.log(errors.errors)
        return res.redirect("/upload")

    }else if(!req.file ) {
        
        req.session.flash = [{path:"portfolio",msg:"No files selected"}]
        console.log(req.session.flash)

        return res.redirect("/upload")
    }
   
    const entryVideo = {
        id: req.body.portfolioId,
        title: req.body.portfolioTitle,
        description: req.body.description,
        work: req.file.path,
    }

    portfolioDatabase.data.push(entryVideo)
    // writePortfolioDataBase()

	req.session.flash = [{path: "portfolio-success", msg: "Upload succeded"}]

	res.redirect("/upload")
}


module.exports = {
    workCreateMusic,
    workCreateVideo,
    workCreateElectroacoustic,
    workCreatePortfolio
}