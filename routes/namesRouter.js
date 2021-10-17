const express = require("express");
const router = express.Router();

const randomNameGenerator = require("random-indian-name");

router.get('/', (req, res) => {
  return res.json({ status: "success" });
});

router.get('/names', (req, res) => {
  return res.json({
    names: [
      randomNameGenerator()
    ]
  });
});

module.exports = router;

