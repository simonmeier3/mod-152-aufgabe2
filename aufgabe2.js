"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var multer = require("multer");
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
app.post('/api/file', upload.single('file'), function (req, res) {
    res.json({ success: 'done' });
});
app.listen(3000);
