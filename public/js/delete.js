const fs = require("fs");
const path = require("path");
const musicData = path.join(__dirname, "../../../../../../data/electroacousticDatabase.json");
const metalData = path.join(__dirname, "../../../../../../data/musicDatabase.json");
const videoData = path.join(__dirname, "../../../../../../data/movieDatabase.json");
const portfolioData = path.join(__dirname, "../../../../../../data/portfolioDatabase.json");

async function deleteMusicData(targetIndex) {
    try {
        const data = await fs.promises.readFile(musicData, "utf8");
        let jsonData = JSON.parse(data);

        console.log(targetIndex)

        if (targetIndex < 0 || targetIndex >= jsonData.data.length) {
            throw new Error(`Indice non valido: ${targetIndex}`);
        }
        
        try {
            const fileToDelete = jsonData.data[targetIndex].piece;
            await fs.promises.unlink(path.join(__dirname, "../../", fileToDelete));
            console.log(`File eliminato correttamente: `, fileToDelete)
        } catch(error) {
            console.error(`Errore nell'eleminazione del file${fileToDelete}`,error)
        }

        await jsonData.data.splice(targetIndex, 1);

        const updatedJson = JSON.stringify(jsonData, null, 2);
        await fs.promises.writeFile(musicData, updatedJson, "utf8");
        
        console.log("Oggetto rimosso con successo");
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function deleteMetalData(targetIndex) {
    try {
        const data = await fs.promises.readFile(metalData, "utf8");
        let jsonData = JSON.parse(data);

        if (targetIndex < 0 || targetIndex >= jsonData.data.length) {
            throw new Error(`Indice non valido: ${targetIndex}`);
        }
        
        for (let index = 0; index < jsonData.data[targetIndex].files.length;index++) {
            const fileToDelete = jsonData.data[targetIndex].files[index].file;
            try {
                await fs.promises.unlink(path.join(__dirname, "../../", fileToDelete));
                console.log(`File eliminato correttamente: ${fileToDelete}`)
            } catch(error) {
                console.error(`Errore nell'eliminazione del file ${fileToDelete}`,error)
            }
        }

        const imageToDelete = jsonData.data[targetIndex].image;
        try {
            await fs.promises.unlink(path.join(__dirname,"../../",imageToDelete))
            console.log(`File eliminato correttamente: ${imageToDelete}`)
        } catch(error) {
            console.error(`Errore nell'eliminazione del file ${imageToDelete}`,error)
        }

        await jsonData.data.splice(targetIndex, 1);
        const updatedJson = JSON.stringify(jsonData, null, 2);
        await fs.promises.writeFile(metalData, updatedJson, "utf8");
        
        console.log("Oggetto rimosso con successo");
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function deleteVideoData(targetIndex) {
    try {
        const data = await fs.promises.readFile(videoData, "utf8");
        let jsonData = JSON.parse(data);

        if (targetIndex < 0 || targetIndex >= jsonData.data.length) {
            throw new Error(`Indice non valido: ${targetIndex}`);
        }

        try {
            const fileToDelete = jsonData.data[targetIndex].video;
            await fs.promises.unlink(path.join(__dirname, "../../", fileToDelete));
            console.log(`File eliminato correttamente: ${fileToDelete}`)
        } catch (error) {
            console.error(`Errore nell'eliminazione del file: ${fileToDelete}`,error)
        }

        jsonData.data.splice(targetIndex, 1);

        const updatedJson = JSON.stringify(jsonData, null, 2);
        await fs.promises.writeFile(videoData, updatedJson, "utf8");
        
        console.log("Oggetto rimosso con successo");
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function deletePortfolioData(targetIndex) {
    try {
        const data = await fs.promises.readFile(portfolioData, "utf8");
        let jsonData = JSON.parse(data);

        console.log(targetIndex)

        if (targetIndex < 0 || targetIndex >= jsonData.data.length) {
            throw new Error(`Indice non valido: ${targetIndex}`);
        }
        
        try {
            const fileToDelete = jsonData.data[targetIndex].work;
            await fs.promises.unlink(path.join(__dirname, "../../", fileToDelete));
            console.log(`File eliminato correttamente: `, fileToDelete)
        } catch(error) {
            console.error(`Errore nell'eleminazione del file${fileToDelete}`,error)
        }

        await jsonData.data.splice(targetIndex, 1);

        const updatedJson = JSON.stringify(jsonData, null, 2);
        await fs.promises.writeFile(portfolioData, updatedJson, "utf8");
        
        console.log("Oggetto rimosso con successo");
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    deleteContactData,
    deleteMusicData,
    deleteVideoData,
    deleteMetalData,
    deletePortfolioData
};
