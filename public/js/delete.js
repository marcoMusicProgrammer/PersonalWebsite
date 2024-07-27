const fs = require("fs");
const path = require("path");
const { baseDataDir,musicDatabase, movieDatabase, electroacousticDatabase, portfolioDatabase} = require("../../config.js")

async function deleteMusicData(targetIndex) {
    try {
        // Leggi e parse il file JSON
        const data = await fs.promises.readFile(electroacousticDatabase, "utf8");
        let jsonData = JSON.parse(data);

        console.log('Dati JSON:', jsonData);

        // Verifica l'indice
        if (targetIndex < 0 || targetIndex >= jsonData.data.length) {
            throw new Error(`Indice non valido: ${targetIndex}`);
        }

        // Estrai il file da eliminare
        const fileToDelete = jsonData.data[targetIndex].piece;
        if (!fileToDelete) {
            throw new Error(`Nessun file associato all'indice ${targetIndex}`);
        }

        console.log('File da eliminare:', fileToDelete);

        // Costruisci il percorso completo del file
        const filePath = path.join(baseDataDir, "../", fileToDelete);
        console.log('Percorso del file:', filePath);

        // Verifica l'accessibilità del file
        try {
            await fs.promises.access(filePath, fs.constants.W_OK);
            console.log('Il file è accessibile e scrivibile.');
        } catch (accessError) {
            console.error('Errore di accesso al file:', accessError);
            throw new Error(`Non è possibile accedere al file: ${filePath}`);
        }

        // Elimina il file
        await fs.promises.unlink(filePath);
        console.log(`File eliminato correttamente: ${fileToDelete}`);

        // Rimuovi l'oggetto dall'array e aggiorna il file JSON
        jsonData.data.splice(targetIndex, 1);
        const updatedJson = JSON.stringify(jsonData, null, 2);
        await fs.promises.writeFile(electroacousticDatabase, updatedJson, "utf8");

        console.log("Oggetto rimosso con successo");
    } catch (error) {
        console.error('Errore durante l\'eliminazione dei dati:', error);
        throw error;
    }
}

async function deleteMetalData(targetIndex) {
    try {
        const data = await fs.promises.readFile(musicDatabase, "utf8");
        let jsonData = JSON.parse(data);

        if (targetIndex < 0 || targetIndex >= jsonData.data.length) {
            throw new Error(`Indice non valido: ${targetIndex}`);
        }
        
        for (let index = 0; index < jsonData.data[targetIndex].files.length;index++) {
            const fileToDelete = jsonData.data[targetIndex].files[index].file;
            try {
                await fs.promises.unlink(path.join(baseDataDir,"../", fileToDelete));
                console.log(`File eliminato correttamente: ${fileToDelete}`)
            } catch(error) {
                console.error(`Errore nell'eliminazione del file ${fileToDelete}`,error)
            }
        }

        const imageToDelete = jsonData.data[targetIndex].image;
        try {
            await fs.promises.unlink(path.join(baseDataDir,"../",imageToDelete))
            console.log(`File eliminato correttamente: ${imageToDelete}`)
        } catch(error) {
            console.error(`Errore nell'eliminazione del file ${imageToDelete}`,error)
        }

        await jsonData.data.splice(targetIndex, 1);
        const updatedJson = JSON.stringify(jsonData, null, 2);
        await fs.promises.writeFile(musicDatabase, updatedJson, "utf8");
        
        console.log("Oggetto rimosso con successo");
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function deleteVideoData(targetIndex) {
    try {
        const data = await fs.promises.readFile(movieDatabase, "utf8");
        let jsonData = JSON.parse(data);

        if (targetIndex < 0 || targetIndex >= jsonData.data.length) {
            throw new Error(`Indice non valido: ${targetIndex}`);
        }

        const fileToDelete = jsonData.data[targetIndex].video;

        try {
            await fs.promises.unlink(path.join(baseDataDir,"../", fileToDelete));
            console.log(`File eliminato correttamente: ${fileToDelete}`)
        } catch (error) {
            console.error(`Errore nell'eliminazione del file: ${fileToDelete}`,error)
        }

        jsonData.data.splice(targetIndex, 1);

        const updatedJson = JSON.stringify(jsonData, null, 2);
        await fs.promises.writeFile(movieDatabase, updatedJson, "utf8");
        
        console.log("Oggetto rimosso con successo");
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function deletePortfolioData(targetIndex) {
    try {
        const data = await fs.promises.readFile(portfolioDatabase, "utf8");
        let jsonData = JSON.parse(data);

        console.log(targetIndex)

        if (targetIndex < 0 || targetIndex >= jsonData.data.length) {
            throw new Error(`Indice non valido: ${targetIndex}`);
        }

        const fileToDelete = jsonData.data[targetIndex].work;
        
        try {
            await fs.promises.unlink(path.join(baseDataDir,"../", fileToDelete));
            console.log(`File eliminato correttamente: `, fileToDelete)
        } catch(error) {
            console.error(`Errore nell'eleminazione del file${fileToDelete}`,error)
        }

        await jsonData.data.splice(targetIndex, 1);

        const updatedJson = JSON.stringify(jsonData, null, 2);
        await fs.promises.writeFile(portfolioDatabase, updatedJson, "utf8");
        
        console.log("Oggetto rimosso con successo");
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    deleteMusicData,
    deleteVideoData,
    deleteMetalData,
    deletePortfolioData
};
