import express = require('express');
import multer = require("multer");
import sharp from "sharp";

let app = express();

let store = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, __dirname + '/uploads')
    },
    filename: (req, file, cb) => {
        if(file.mimetype.indexOf("image") > -1){
            cb(null, Date.now() + "_" + file.originalname);
        } else {
            cb({
                message: "Not a Image File",
                name: "error"
            }, "null")
        }
    }
});

let upload = multer({storage: store});

app.post('/api/file', upload.single('file'), (req,res,next ) => {

    try {
        let filename = req.file.filename;
        let smallFile = convertingSmall(filename);
        let mediumFile = convertingMedium(filename);
        let largeFile = convertingLarge(filename);
        let thumbnailFile = convertingThumbnail(filename);
        let originalFile = convertingOriginal(filename);

        res.json({
            data: {
                images: {
                    "small": "https://polar-thicket-37960.herokuapp.com/converted/" + smallFile,
                    "medium": "https://polar-thicket-37960.herokuapp.com/converted/" + mediumFile,
                    "large": "https://polar-thicket-37960.herokuapp.com/converted/" + largeFile,
                    "thumbnail": "https://polar-thicket-37960.herokuapp.com/converted/" + thumbnailFile,
                    "original": "https://polar-thicket-37960.herokuapp.com/converted/" + originalFile,
                }
            }
        });
    }catch (ex){
        res.status(400).send(ex);
    }

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

app.listen(process.env.PORT || 3000);



