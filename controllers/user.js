const {db} = require('../models');
const { Op } = require('sequelize');
const { hashPassword, comparePassword } = require('../utils/helpers');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');   

const {validateRegister, validateFile} = require('../validations');


const register = async(req,res) => {
    try { 
    const validateData = validateRegister(req.body);
        if (validateData.error) {
            res.status(400)
           
            throw new Error(validateData.error.details[0].message);
        }
        const {email, fullname, password} = req.body
        //check if the user already exists
        const user = await db.User.findOne({
            where: {email }
            
        })
        if (user) {
          
            throw new Error('User already exists');
        }
       const { hash, salt } = await hashPassword(password);
        const newUser = await db.User.create({
            user_id: uuidv4(),
            fullname,
            email,
            password_hash: hash,
           password_salt: salt
        })
        res.status(201).json({
            status: true,
            message: 'User created successfully',
        })
    } catch (err) { 
        res.status(500).json({
            status: false,
            message: err.message || 'Something went wrong'
        });
    }
}


const login = (req, res) => {

}

const uploadFile = async (req, res) => {
try{
    const validateData = validateFile(req.body);
        if (validateData.error) {
            res.status(400)
           
            throw new Error(validateData.error.details[0].message);
        }
        const {user_id, fileName,file_url} = req.body
        const newFile = await db.Files.create({
            user_id: user_id,
            file_id: uuidv4(),
            fileName: fileName,
             file_url: file_url
        })
        res.status(201).json({
            status: true,
            message: 'file uploaded successfully',
        })
    }catch (err) { 
        res.status(500).json({
            status: false,
            message: err.message || 'Something went wrong'
        });
    }
}
    

const getOneFile = async(req, res) => {
    
        try {
            const {user_id, file_id} =req.body
            if(!file_id|| !user_id){
                throw new Error('please let us know you and the file you are looking for')
            }
            const file = await db.Files.findOne({
                attributes:[safe],
                where: {
                    [Op.and]: [{ user_id: user_id }, { file_id: file_id}]
                }
            });
            if(!file) {
                throw new Error(`Couldn't find file`)
            }
            if (file.safe === false){
                throw new Error(`This file is not safe for you`)
            }
            res.status(200).json({
                status: true,
                message: 'file retrieved successfully',
                data: file
            })
        
        } catch (err) {
            res.status(500).json({
                status: false,
                error: err.message
            })
        }
    }
module.exports ={
    register,
    getOneFile,
    uploadFile
}
