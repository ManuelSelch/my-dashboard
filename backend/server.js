const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = 5001;



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const filePath = path.join('uploads/', file.originalname);

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

/*
app.use(cors({
  origin: 'https://dashboard.dev.manuelselch.de'
}));
*/

// Add headers before the routes are defined
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(bodyParser.json());


app.get('/home', (req, res) => {
    read("data/home.json", res);
});



app.post('/upload-file', upload.single('file'), (req, res) => {
  res.status(200).send('File uploaded successfully with filename: ' + req.file.originalname);
});

// Endpoint to return the image with the requested file name
app.get('/uploads/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', filename);

  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send('File not found');
    }

    // Send the file as a response
    res.sendFile(filePath);
  });
});



function read(file, res) {
  const configPath = path.join(__dirname, file);
  fs.readFile(configPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading config file');
    }
    res.send(JSON.parse(data));
  });
}

function write(file, data, res) {
  const configPath = path.join(__dirname, file);
  fs.writeFile(configPath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      return res.status(500).send('Error writing to config file');
    }
    res.send('Config file updated successfully');
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
