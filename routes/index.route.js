const express = require('express');
const upload = require('../config/multer.config');

const router = express.Router();

router.get('/home',(req,res) => {
    res.render("Home")
});

router.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    console.log('File uploaded:', req.file); 
     res.send('File uploaded successfully.');
});


    


module.exports = router;