const multer = require("multer");
const ImageModel = require('../models/image')
const path = require("path");
const fs = require('fs');
const router = require('express').Router();
const uniqueFilename = require('unique-filename');
const os = require('os');

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
            var randomPrefixedTmpfile = uniqueFilename("_", req.body.name)
            const newImage = new ImageModel({
                name: randomPrefixedTmpfile,
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
        let imgId = req.params.id;
        if (imgId) {
            try {
                const allData = await ImageModel.findOne({ _id: imgId });
                res.status(200).json(allData);
            } catch (error) {
                res.status(500);
            }
        }
    } catch (error) {
        res.status(500);
    }

})

router.delete('/upload/:id', async (req, res) => {
    if (req.params.id){
        try{
            const image = await ImageModel.findOne({_id: req.params.id});
            if(image){
                try{
                    await image.delete();
                    res.status(200).json("image deleted")
                }catch(e){
                    res.status(500).json(e);
                }
            } else {
                res.status(404).json("image not found");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
})

module.exports = router
