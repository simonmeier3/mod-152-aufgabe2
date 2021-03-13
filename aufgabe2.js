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
        cb(null, Date.now() + "_" + file.originalname);
    }
});
var upload = multer({ storage: store });
app.post('/api/file', upload.single('file'), function (req, res, next) {
    var filename = req.file.filename;
    convertingSmall(filename);
    convertingMedium(filename);
    convertingLarge(filename);
    convertingThumbnail(filename);
    convertingOriginal(filename);
    res.json("Done");
});
function convertingSmall(img) {
    sharp_1.default(__dirname + '/uploads/' + img)
        .resize(720, null, {
        fit: 'contain'
    })
        .toFile(__dirname + '/uploads/converted/small_' + img);
}
function convertingMedium(img) {
    sharp_1.default(__dirname + '/uploads/' + img)
        .resize(1280, null, {
        fit: 'contain'
    })
        .toFile(__dirname + '/uploads/converted/medium_' + img);
}
function convertingLarge(img) {
    sharp_1.default(__dirname + '/uploads/' + img)
        .resize(1920, null, {
        fit: 'contain'
    })
        .toFile(__dirname + '/uploads/converted/large_' + img);
}
function convertingThumbnail(img) {
    sharp_1.default(__dirname + '/uploads/' + img)
        .resize(360, null, {
        fit: 'contain'
    })
        .toFile(__dirname + '/uploads/converted/thumbnail_' + img);
}
function convertingOriginal(img) {
    sharp_1.default(__dirname + '/uploads/' + img)
        .resize(null, null, {
        fit: 'contain'
    })
        .toFile(__dirname + '/uploads/converted/original_' + img);
}
app.listen(3000);
