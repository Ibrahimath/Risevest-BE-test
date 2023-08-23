const express = require('express');
const router = express.Router();

const {register,getOneFile, uploadFile,login} = require('../controllers/user')

router.post("/register", register);
router.post("/files/upload", uploadFile);
router.get("/files/get", getOneFile);
router.post("/login", login);


module.exports = router;