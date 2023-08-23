const express = require('express');
const router = express.Router();
const {register,getOneFile, download,login, upload} = require('../controllers/user')

router.post("/register", register);
//router.post("/files/upload", uploadFile);
router.get("/files/get", getOneFile);
router.post("/login", login);
router.post("/upload/:email", upload);
router.get("/download/:email/:filename", download)

module.exports = router;