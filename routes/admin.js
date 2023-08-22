const express = require('express');
const router = express.Router();

const {markFiles} = require('../controllers/Admin')

router.post("/files/mark", markFiles);


module.exports = router;