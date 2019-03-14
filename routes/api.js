var express = require('express');
var router = express.Router();

const potterlist = require('../data/potter-words');
const gotlist = require('../data/got-long-words');

const wordlists = {
  potter: potterlist,
  got: gotlist,
};

/* GET home page. */
router.get('/', function(req, res) {
  res.json({ msg: 'I am a node.js API!' });
});

router.get('/wordlist/:key', (req, res) => {
  const { key } = req.params;
  const words = wordlists[key];
  if (words) {
    return res.send(words);
  }
  return res.status(404).send('Wordlist not found.');
})

module.exports = router;
