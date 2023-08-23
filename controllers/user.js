require('dotenv').config()
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
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
            let isAdmin;
        email.indexOf('@rise') !== -1 ? isAdmin = true: false
       const { hash, salt } = await hashPassword(password);
        const newUser = await db.User.create({
            user_id: uuidv4(),
            fullname,
            email,
            isAdmin: isAdmin,
            passwordHash: hash,
           passwordSalt: salt
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



    const login = async (req, res) => { 
    
        const { email, password } = req.body
        try { 
            if (!email || !password) {
                res.status(400)
                throw new Error('All fields are required');
            } 
            //check if the user already exists
            const user = await db.User.findOne({
                where: {
                    email: email
                }
            })
    
         
            if (!user) {
                res.status(400)
                throw new Error('Invalid credentials');
            }
            
            
            const checkPasssword = await comparePassword(password, user.dataValues.passwordHash)
            if (!checkPasssword) {
                res.status(400)
                throw new Error('Invalid credentials');
            };
            
            //generate token
            const token = jwt.sign({
                email: user.dataValues.email,
                _id: uuidv4()
            }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
            res.status(200).json({
                status: true,
                message: 'User logged in successfully',
                token
            })

            return
        } catch (err) { 
            res.json({
                status: false,
                message: err.message
            });
        }
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
    
const upload = (req, res) => {
    res.json({ message: 'File uploaded successfully' });
  };


const getOneFile = async(req, res) => {
    
        try {
            const {user_id, file_id, email} =req.body
            if(!file_id|| !user_id){
                throw new Error('please let us know you and the file you are looking for')
            }
            const file = await db.Files.findOne({
                //attributes:['safe'],
                where: {
                    [Op.and]: [{ user_id: user_id }, { file_id: file_id}]
                }
            });

            console.log("AAAA"+file.user_id);

            if(!file) {
                throw new Error(`Couldn't find file`)
            }
            if (file.safe === false){
                throw new Error(`This file is not safe for you`)
            }
            
            delete file.dataValues.user_id;
            delete file.dataValues.file_id;
            
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
    uploadFile,
    login,
    upload
}
