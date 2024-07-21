const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require("multer");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), '/uploads/'));
  },
  filename: function (req, file, cb) {
    const filePath = path.join(process.cwd(), '/uploads/', file.originalname);

    // Check if the file exists and remove it
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (!err) {
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) {
            console.error('Error deleting existing file:', unlinkErr);
          }
          cb(null, file.originalname);
        });
      } else {
        cb(null, file.originalname);
      }
    });
  }
});
const upload = multer({ storage: storage });



const router = express.Router();

router.get('/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '..', 'uploads', filename);

  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({error: 'file not found'});
    }

    // Send the file as a response
    res.sendFile(filePath);
  });
});


router.post('/', upload.single('file'), (req, res) => {
  res.status(200).json({success:'file uploaded successfully with filename: ' + req.file.originalname});
});


module.exports = router;
