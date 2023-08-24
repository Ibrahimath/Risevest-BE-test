const express = require('express');
const router = express.Router();
const {register,getOneFile, download,login, upload, createFolder, addToFolder} = require('../controllers/user')
const {authorization} =  require('../middlewares/authorization')


router.post("/register", register);
router.get("/files/get", getOneFile);
router.post("/login", login);
router.post("/upload/:email", upload);
router.get("/download/:email/:fileName", download)
router.post("/addToFolder", authorization,addToFolder);
router.post("/createFolder",authorization,  createFolder);

module.exports = router;