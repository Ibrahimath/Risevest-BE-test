const express = require("express");
const router = express.Router();

const { markFiles } = require("../controllers/admin");
const { isAdmin } = require("../middlewares/isAdmin");
const { authorization } = require("../middlewares/authorization");
router.post("/files/mark",authorization,isAdmin, markFiles);

module.exports = router;
