import express = require('express');
import multer = require("multer");

let app = express();

let store = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, __dirname + '/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname);
    }
});

let upload = multer({storage: store});

app.post('/api/file', upload.single('file'),(req, res) => {
    res.json({success: 'done'});
})

app.listen(3000);



