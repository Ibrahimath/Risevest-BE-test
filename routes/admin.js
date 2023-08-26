const express = require("express");
const router = express.Router();

const { markFiles } = require("../controllers/admin");

router.post("/files/mark", markFiles);

module.exports = router;
