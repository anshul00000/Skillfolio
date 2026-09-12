const express = require('express');
const router = express.Router();
const contact_schema = require('../models/contact_model');

//  *********************************
//  ****   contact route  ******
//  *********************************

router.get('/', (req, res) => {
  res.send("hyy this is contact ✅🙄");
});

router.post('/', async (req, res) => {
  const body_data = req.body;

  const contact_ = await contact_schema.create(body_data);

  if (contact_) {
    res.json({ msg: "yas data is insert sussfully ✔️" });
  } else {
    res.json({ msg: "data is not send sussefully ❌" });
  }
});

module.exports = router;
