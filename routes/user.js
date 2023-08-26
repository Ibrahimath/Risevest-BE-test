const express = require("express");
const router = express.Router();
const {
  register,
  download,
  login,
  upload,
  createFolder,
  addToFolder,
} = require("../controllers/user");
const { authorization } = require("../middlewares/authorization");

router.post("/register", register);
router.post("/login", login);
router.post("/upload/:email", authorization, upload);
router.get("/download/:email/:fileName", authorization, download);
router.post("/createFolder", authorization, createFolder);

module.exports = router;
