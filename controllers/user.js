require("dotenv").config();
//const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const { Dropbox } = require("dropbox");

const { db } = require("../models");
const { hashPassword, comparePassword } = require("../utils/helpers");
const { validateRegister, validateFile } = require("../Validations");

const register = async (req, res) => {
  try {
    const validateData = validateRegister(req.body);
    if (validateData.error) {
      res.status(400);

      throw new Error(validateData.error.details[0].message);
    }
    const { email, fullName, password } = req.body;
    //check if the user already exists
    const user = await db.User.findOne({
      where: { email },
    });
    if (user) {
      throw new Error("User already exists");
    }
    let isAdmin;
    email.indexOf("@rise.com") !== -1 ? isAdmin = true : false;
    const { hash, salt } = await hashPassword(password);
    const newUser = await db.User.create({
      user_id: uuidv4(),
      fullName,
      email,
      isAdmin: isAdmin,
      passwordHash: hash,
      passwordSalt: salt,
    });
    delete newUser.dataValues.user_id
    delete newUser.dataValues.passwordHash
    delete newUser.dataValues.passwordSalt
    res.status(201).json({
      status: true,
      message: "User created successfully",
      data: newUser.dataValues
    });
  } catch (err) {
    res.status(401).json({
      status: false,
      message: err.message || "Something went wrong",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(401);
      throw new Error("All fields are required");
    }
    const user = await db.User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      res.status(401);
      throw new Error("Invalid credentials");
    }

    const checkPasssword = await comparePassword(
      password,
      user.dataValues.passwordHash
    );
    if (!checkPasssword) {
      res.status(401);
      throw new Error("Invalid credentials");
    }

    //generate token
    const token = jwt.sign(
      {
        email: user.dataValues.email,
        _id: uuidv4(),
      },
      process.env.JWT_SECRET,
      { expiresIn: "10d" }
    );

    res.status(200).json({
      status: true,
      message: "User logged in successfully",
      token,
    });

    return;
  } catch (err) {
    res.json({
      status: false,
      message: err.message,
    });
  }
};

const upload = async (req, res) => {
  try {
    const dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN });
    const email = req.params.email;
    const file = req.files.file;
    
    if (!file || !email) {
      throw new Error("please provide both email and file to upload");
    }
    const user = await db.User.findOne({
      where: { email: email },
    });

    if (!user) {
      throw new Error("user not registered");
    }

    const folderPath = `/${email}`;
    const filePath = `${folderPath}/${file.name}`;
    const fileStream = file.data;

    await dbx.filesUpload({ path: filePath, contents: fileStream });
    await db.Files.create({
      email,
      file_id: uuidv4(),
      filePath,
    });

    res.json({
      status: true,
      message: "File uploaded successfully!",
    });
    return;
  } catch (e) {
    res.json({
      status: false,
      message: e.message,
    });
  }
};

const download = async (req, res) => {
  try {
    const { email, fileName } = req.params;
    if (!fileName || !email) {
      throw new Error("please provide both email and fileName");
    }
    const user = await db.User.findOne({
      where: { email: email },
    });
    if (!user) {
      throw new Error("user not found");
    }

    const dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN });

    const filePath = `/${email}/${fileName}`;
    const { result } = await dbx.filesDownload({ path: filePath });

    res.setHeader("Content-Disposition", `attachment; fileName="${fileName}"`);
    res.setHeader("Content-Type", "application/octet-stream");
    res.send(result.fileBinary);
    return;
  } catch (e) {
    res.json({
      status: false,
      message: e.message,
    });
  }
};

const createFolder = async (req, res) => {
  try {
    const { email, folderName } = req.body;
    if (!email || !folderName) {
      throw new Error(`Couldn't create folder due to incomplete credentials`);
    }
    const user = await db.User.findOne({
      where: { email: email },
    });
    if (!user) {
      throw new Error("user not found");
    }

    const findFolder = await db.Folder.findOne({
      where: { folderName: folderName },
    });

    if (findFolder) {
      throw new Error("Folder already exists");
    }
    await db.Folder.create({
      email,
      folderName,
      folder_id: uuidv4(),
    });

    res.status(201).json({
      status: true,
      message: "Folder created successfully",
    });
    return;
  } catch (e) {
    res.status(401).json({
      status: false,
      error: e.message,
    });
  }
};

module.exports = {
  register,
  login,
  upload,
  download,
  createFolder,
};
