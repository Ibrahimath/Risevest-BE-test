const {db} = require('../models');
//const { Op } = require('sequelize');
//const { hashPassword, comparePassword } = require('../utils/helpers');
//const { v4: uuidv4 } = require('uuid');
//const jwt = require('jsonwebtoken');   

const {validateFile} = require('../validations');

const allFiles = async (req, res) => {
    try {
        const files = await db.Files.findAll();
        res.status(200).json({
            status: true,
            message: 'files retrieved successfully',
            data: files
        })
    
    } catch (err) {
        res.status(500).json({
            status: false,
            error: err.message
        })
    }
}

const markFiles =async(req,res) => {
        const {file_id } = req.params
    
    try {
        const {file_id} = req.body
        if(!file_id) {
            throw new Error("please let us know what you want to mark")
        }

        const file = await db.Files.findOne({
            where: {file_id:file_id},
            
        })
        console.log("AAA" +file);
    file.safe = !safe
        res.status(200).json({
            status: true,
            message: 'File marked successfully',
        })
     }
    catch (err) {
        res.status(500).json({
            status: false,
            error: err.message
        });
    }
} 

module.exports = {
    allFiles,
    markFiles
}