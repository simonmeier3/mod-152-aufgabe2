import express = require('express');
import multer = require("multer");
import sharp from "sharp";

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

app.post('/api/file', upload.single('file'), (req,res,next ) => {

    let filename = req.file.filename;
    convertingSmall(filename);
    convertingMedium(filename);
    convertingLarge(filename);
    convertingThumbnail(filename);
    convertingOriginal(filename);
    res.json("Done");
});

function convertingSmall(img: string){
sharp(__dirname + '/uploads/' + img)
    .resize(720, null, {
        fit: 'contain'
    })
    .toFile(__dirname + '/uploads/converted/small_' + img);
}
function convertingMedium(img: string){
    sharp(__dirname + '/uploads/' + img)
        .resize(1280, null, {
            fit: 'contain'
        })
        .toFile(__dirname + '/uploads/converted/medium_' + img);
}
function convertingLarge(img: string){
    sharp(__dirname + '/uploads/' + img)
        .resize(1920, null, {
            fit: 'contain'
        })
        .toFile(__dirname + '/uploads/converted/large_' + img);
}
function convertingThumbnail(img: string){
    sharp(__dirname + '/uploads/' + img)
        .resize(360, null, {
            fit: 'contain'
        })
        .toFile(__dirname + '/uploads/converted/thumbnail_' + img);
}

function convertingOriginal(img: string){
    sharp(__dirname + '/uploads/' + img)
        .resize(null, null, {
            fit: 'contain'
        })
        .toFile(__dirname + '/uploads/converted/original_' + img);
}



app.listen(3000);



