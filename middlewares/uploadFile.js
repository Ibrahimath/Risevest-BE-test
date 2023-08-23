const express = require('express');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Configure AWS
aws.config.update({
  region: 'us-east-1', // Change to your desired region
});

const s3 = new aws.S3();

// Configure multer to use Amazon S3 for storage
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    key: function (req, file, cb) {
      const folder = req.body.folder ? req.body.folder + '/' : '';
      cb(null, 'uploads/' + folder + Date.now() + '_' + file.originalname);
    }
  })
});

const fileUpload = upload.single('file')

module.exports = fileUpload