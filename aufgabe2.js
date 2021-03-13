"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var multer = require("multer");
var sharp_1 = __importDefault(require("sharp"));
var app = express();
var store = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, cb) {
        if (file.mimetype.indexOf("image") > -1) {
            cb(null, Date.now() + "_" + file.originalname);
        }
        else {
            cb({
                message: "Not a Image File",
                name: "error"
            }, "null");
        }
    }
});
var upload = multer({ storage: store });
app.post('/api/file', upload.single('file'), function (req, res, next) {
    try {
        var filename = req.file.filename;
        var smallFile = convertingSmall(filename);
        var mediumFile = convertingMedium(filename);
        var largeFile = convertingLarge(filename);
        var thumbnailFile = convertingThumbnail(filename);
        var originalFile = convertingOriginal(filename);
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
    }
    catch (ex) {
        res.status(400).send(ex);
    }
});
function convertingSmall(img) {
    sharp_1.default(__dirname + '/uploads/' + img)
        .resize(720, null, {
        fit: 'contain'
    })
        .toFile(__dirname + '/uploads/converted/small_' + img);
    return "small_" + img;
}
function convertingMedium(img) {
    sharp_1.default(__dirname + '/uploads/' + img)
        .resize(1280, null, {
        fit: 'contain'
    })
        .toFile(__dirname + '/uploads/converted/medium_' + img);
    return "medium_" + img;
}
function convertingLarge(img) {
    sharp_1.default(__dirname + '/uploads/' + img)
        .resize(1920, null, {
        fit: 'contain'
    })
        .toFile(__dirname + '/uploads/converted/large_' + img);
    return "large_" + img;
}
function convertingThumbnail(img) {
    sharp_1.default(__dirname + '/uploads/' + img)
        .resize(360, null, {
        fit: 'contain'
    })
        .toFile(__dirname + '/uploads/converted/thumbnail_' + img);
    return "thumbnail_" + img;
}
function convertingOriginal(img) {
    sharp_1.default(__dirname + '/uploads/' + img)
        .resize(null, null, {
        fit: 'contain'
    })
        .toFile(__dirname + '/uploads/converted/original_' + img);
    return "original_" + img;
}
app.use(express.static('uploads'));
app.listen(3000);
