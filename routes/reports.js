const router = require("express").Router();
const ReportModel = require('../models/report');

//post request
router.post('/', async (req, res) => {
    const newReport = new ReportModel(req.body);
    try {
        await newReport.save();
        res.status(200).send("Report sent");
    } catch (err) {
        res.status(500).json(err);
    }
})

//get All reports
router.get('/', async (req, res) => {
    try {
        const posts = await ReportModel.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;