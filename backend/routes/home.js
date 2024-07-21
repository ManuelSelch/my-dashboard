const express = require('express');
const json = require('../helper/json');

const homeFile = 'data/home.json';
const router = express.Router();

router.get('/', (req, res) => {
  json.read(homeFile, (err, data) => {
    if(err) {
      return res.status(500).json({error: err});
    }
    res.json(data);
  });
});

module.exports = router;
