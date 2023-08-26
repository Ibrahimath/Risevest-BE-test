const { db } = require("../models");
//const { Op } = require('sequelize');
//const { hashPassword, comparePassword } = require('../utils/helpers');
//const { v4: uuidv4 } = require('uuid');
//const jwt = require('jsonwebtoken');

const { validateFile } = require("../Validations");

const getAllFiles = async (req, res) => {
  try {
    const files = await db.Files.findAll();
    res.status(200).json({
      status: true,
      message: "files retrieved successfully",
      data: files,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      error: err.message,
    });
  }
};

const markFiles = async (req, res) => {

  try {
    const { filePath, email } = req.body;

    if (!filePath) {
      throw new Error("please let us know what you want to mark");
    }

    const file = await db.Files.findOne({
      where: { filePath: filePath },
    });
    
    file.dataValues.safe = !file.dataValues.safe;
    

    await db.Files.update({ safe: file.dataValues.safe }, {
      where: {
        filePath
      }
    });
    res.status(200).json({
      status: true,
      message: "File marked successfully",
      safe:file.dataValues.safe
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      error: err.message,
    });
  }
};

module.exports = {
  getAllFiles,
  markFiles,
};
