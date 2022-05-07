const multer = require("multer");
const ImageModel = require('../models/image')
const path = require("path");
const fs = require('fs');
const router = require('express').Router();

//image upload
const Storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: Storage
}).single('file')

router.post('/upload', async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.log(err)
        }
        else {
            const newImage = new ImageModel({
                name: req.body.name,
                image: {
                    data: fs.readFileSync('uploads/' + req.file.filename),
                    contentType: 'image/jpg'
                }
            })
            try {
                let image = await newImage.save()
                res.send(image);
            } catch (error) {
                console.log(error);
                res.status(500);
            }
        }
    })
})

router.get('/upload/:id', async (req, res) => {
    try {
        const allData = await ImageModel.findById(req.params.id);
        res.status(200).json(allData);
    } catch (error) {
        console.log(error);
        res.status(500);
    }
})

module.exports = router
