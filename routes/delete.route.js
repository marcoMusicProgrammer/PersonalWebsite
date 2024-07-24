const router = require("express").Router()
const { deleteContactData,deleteMusicData,deleteVideoData,deleteMetalData,deletePortfolioData } = require('../public/js/delete.js')

router.post("/login/delete-data",async (req,res)=>{
    const targetIndex = req.body;
    if (!targetIndex) {
        return res.redirect("/login/response")
    }

    try{
        await deleteContactData(targetIndex);
        await new Promise(resolve => setTimeout(resolve, 10)); // Aggiungi un piccolo ritardo
        res.redirect("/login/response")
    } catch (error) {
        res.status(500).send(error.message)
    }
});

router.post('/login/delete-music', async (req, res) => {
    const { id } = req.body;

    console.log("Received body:", req.body);
    
    try {
        await deleteMusicData(id);
        res.status(200).json({ message: 'Success' });
    } catch (error) {
        console.error('Error during file deletion:', error);
        res.status(500).json({ message: error.message });
    }
});

router.post('/login/delete-video', async (req, res) => {
    const { id } = req.body;
    console.log(id)
    try {
        await deleteVideoData(id);
        res.status(200).json({ message: 'Success' });

    } catch (error) {
        console.error('Error during file deletion:', error);
        res.status(500).json({ message: error.message });
    }
});

router.post('/login/delete-metal', async (req, res) => {
    const { id } = req.body;

    console.log("Received body:", req.body);
    
    try {
        await deleteMetalData(id);
        res.status(200).json({ message: 'Success' });
    } catch (error) {
        console.error('Error during file deletion:', error);
        res.status(500).json({ message: error.message });
    }
});

router.post('/login/delete-portfolio', async (req, res) => {
    const { id } = req.body;

    console.log("Received body:", req.body);
    
    try {
        await deletePortfolioData(id);
        res.status(200).json({ message: 'Success' });
    } catch (error) {
        console.error('Error during file deletion:', error);
        res.status(500).json({ message: error.message });
    }
});



module.exports = router