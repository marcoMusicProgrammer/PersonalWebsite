const router = require("express").Router()
const multer = require("multer")
const { workCreateMusic,workCreateVideo,workCreateElectroacoustic,workCreatePortfolio } = require("../controller/work.controllers.js")
const { getYear } = require("../utilities")
const {  music_validators,movie_validators,electroacoustic_validators,portfolio_validators } = require("../middleware/validator")
const { authenticate,login } = require('../middleware/auth.js');


const storage = multer.diskStorage({
	destination: (req,file,cb) => {
		cb(null, "uploads/")
	},
	filename: (req,file,cb) => {
		cb(null, `${Date.now()}-${file.originalname}`)
	}
})

const upload = multer({ storage: storage})

router.get("/upload",authenticate,(req,res)=>{
    res.render("../public/upload.ejs",{Titolo:"Uploader",anno: getYear()})
    console.log("richiesta /upload")
})

const uploadFieldsMusic = upload.fields([
	{ name: 'file', maxCount: 5},
	{ name: 'image', maxCount: 1}
])

const uploadFieldsVideo = upload.single("video")
const uploadFieldsElectroacoustic = upload.single("electroacoustic-piece")
const uploadFieldsPortfolio = upload.single("portfolio")

router.post("/upload-music",uploadFieldsMusic,music_validators,workCreateMusic)
router.post("/upload-video",uploadFieldsVideo,movie_validators,workCreateVideo)
router.post("/upload-electroacoustic",uploadFieldsElectroacoustic,electroacoustic_validators,workCreateElectroacoustic)
router.post("/upload-portfolio",uploadFieldsPortfolio,portfolio_validators,workCreatePortfolio)

module.exports = router