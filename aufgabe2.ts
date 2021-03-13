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
    let smallFile = convertingSmall(filename);
    let mediumFile = convertingMedium(filename);
    let largeFile = convertingLarge(filename);
    let thumbnailFile = convertingThumbnail(filename);
    let originalFile = convertingOriginal(filename);

    res.json({
        data: {
            images: {
                "small": "http://localhost:3000/converted/" + smallFile,
                "medium": "http://localhost:3000/converted/" + mediumFile,
                "large": "http://localhost:3000/converted/" + largeFile,
                "thumbnail": "http://localhost:3000/converted/" + thumbnailFile,
                "original": "http://localhost:3000/converted/" + originalFile,
            }
        }
    });
});

function convertingSmall(img: string){
    sharp(__dirname + '/uploads/' + img)
        .resize(720, null, {
            fit: 'contain'
        })
        .toFile(__dirname + '/uploads/converted/small_' + img);
    return "small_" + img;
}
function convertingMedium(img: string){
    sharp(__dirname + '/uploads/' + img)
        .resize(1280, null, {
            fit: 'contain'
        })
        .toFile(__dirname + '/uploads/converted/medium_' + img);
    return "medium_" + img;
}
function convertingLarge(img: string){
    sharp(__dirname + '/uploads/' + img)
        .resize(1920, null, {
            fit: 'contain'
        })
        .toFile(__dirname + '/uploads/converted/large_' + img);
    return "large_" + img;
}
function convertingThumbnail(img: string){
    sharp(__dirname + '/uploads/' + img)
        .resize(360, null, {
            fit: 'contain'
        })
        .toFile(__dirname + '/uploads/converted/thumbnail_' + img);
    return "thumbnail_" + img;
}

function convertingOriginal(img: string){
    sharp(__dirname + '/uploads/' + img)
        .resize(null, null, {
            fit: 'contain'
        })
        .toFile(__dirname + '/uploads/converted/original_' + img);
    return "original_" + img;
}

app.use(express.static('uploads'));

app.listen(3000);



