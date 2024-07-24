const router = require("express").Router()
const path = require("path")
const fs = require("fs");
const mime = require("mime-types")
const { statSync,createReadStream } = require("fs")
const portfolioDatabase = require("../../../../../data/portfolioDatabase.json")

const requestProcessing = new Set();
const destinationPath = path.resolve('../../../../../data');

router.get("/stream/data/:audiofile", (req,res)=>{
  const range = req.headers.range

  console.log("eccomi!")

  if(!range){
      return res.status(400).send("No range")
  }
  
  const filename = req.params.audiofile
  const audioPath = path.join(destinationPath,filename)
  const fileSize = statSync(audioPath).size
  const mimeType = mime.lookup(audioPath)
  

  const CHUNCK_SIZE = 10**6
  const start = Number(range.replace(/\D/g, ""))
  const end = Math.min(start+CHUNCK_SIZE,fileSize-1)
  const contentLength = end-start + 1

  const headers = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": mimeType || "audio/mp3"
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

    if (!range) {
      return res.status(400).send("No range provided");
    }

    const filename = req.params.videofile;
    const videoPath = path.join(destinationPath, filename);

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


const preventDuplicateRequests = (req, res, next) => {
  const key = `${req.method}-${req.originalUrl}`;
  console.log("key",key)
  if (requestProcessing.has(key)) {
      return res.status(429).send("Request already in progress");
  }
  requestProcessing.add(key);
  res.on('finish', () => requestProcessing.delete(key));
  next();
};


router.get('/download/:id', preventDuplicateRequests,(req, res) => {
  const fileId = req.params.id;
  console.log("FileID: " + fileId);

  const file = portfolioDatabase.data.find(f => f.id == fileId);
  console.log("File: " + JSON.stringify(file));

  if (file) {
      const filePath = path.join(file.work);
      console.log("Path: " + filePath);

      if (fs.existsSync(filePath)) {
          if (!res.headersSent) {
              res.download(filePath, file.name, (err) => {
                  if (err) {
                      console.error('Errore nel download del file:', err);
                      if (!res.headersSent) {
                          res.status(500).send('Errore nel download del file');
                      }
                  } else {
                      console.log('Download completato con successo');
                  }
              });
          } else {
              console.warn('Headers già inviati, impossibile completare il download');
          }
      } else {
          console.error('File non trovato: ' + filePath);
          res.status(404).send('File non trovato');
      }
  } else {
      console.error('File non trovato nel database: ' + fileId);
      res.status(404).send('File non trovato');
  }
});

module.exports = router