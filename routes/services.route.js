const router = require("express").Router()
const path = require("path")
const mime = require("mime-types")
const { statSync,createReadStream } = require("fs")
const portfolioDatabase = require("../portfolioDatabase.json")


router.get("/stream/uploads/:audiofile", (req,res)=>{

    const range = req.headers.range
    

    if(!range){
        return res.status(400).send("No range")
    }
    
    const filename = req.params.audiofile
    const audioPath = path.join("./uploads",filename)
    console.log(audioPath)
    const fileSize = statSync(audioPath).size
    const mimeType = mime.lookup(audioPath)
    

    const CHUNCK_SIZE = 10**6
    const start = Number(range.replace(/\D/g, ""))
    const end = Math.min(start+CHUNCK_SIZE,fileSize-1)
    const contentLength = end-start + 1

    const headers = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Lenght": contentLength,
        "Content-Type": "audio/raw"
    }

    res.writeHead(206, headers)
    const audioStream = createReadStream(audioPath, {start,end})
    audioStream.pipe(res)

    audioStream.on('error', (err) => {
      console.error('Error streaming audio:', err);
      res.status(500).send("Error streaming audio");
    })
})

router.get("/stream/uploads/:videofile", (req, res) => {
    const range = req.headers.range;

    console.log(req)


    if (!range) {
        return res.status(400).send("No range provided");
    }

    const filename = req.params.videofile;
    const videoPath = path.join("./uploads", filename);

    // Controlla se il file esste
    if (!fs.existsSync(videoPath)) {
        return res.status(404).send("File not found");
    }

    const fileSize = statSync(videoPath).size;
    const mimeType = mime.lookup(videoPath);

    const CHUNK_SIZE = 10 ** 6; 
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, fileSize - 1);
    const contentLength = end - start + 1;

    const headers = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": mimeType || "video/mp4" // Use proper video MIME type if available, otherwise default to video/mp4
    };

    res.writeHead(206, headers);
    const videoStream = createReadStream(videoPath, { start, end });

    // Errore headling
    videoStream.on('error', (err) => {
        console.error('Error streaming video:', err);
        res.status(500).send("Error streaming video");
    });

    videoStream.pipe(res);
});

router.get('/download/:id', (req, res) => {
    const fileId = req.params.id;
    const file = portfolioDatabase.data.find(f => f.id == fileId);
    
    if (file) {
        // path.join è un metodo della libreria path di Node.js utilizzato
        // per unire i segmenti di percorso in un unico percorso.
      const filePath = path.join(file.work);
      res.download(filePath, file.name, (err) => {
        if (err) {
          console.error('Errore nel download del file:', err);
          res.status(500).send('Errore nel download del file');
        }
      });
    } else {
      res.status(404).send('File non trovato');
    }
  });


module.exports = router