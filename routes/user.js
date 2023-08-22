const express = require('express');
const router = express.Router();

const {register,getOneFile, uploadFile} = require('../controllers/user')

router.post("/register", register);
router.post("/files/upload", uploadFile);
router.get("/files/get", getOneFile);


module.exports = router;