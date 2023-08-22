require('dotenv').config()
const jwt = require('jsonwebtoken');
const models = require('../models')

const authorization = (req, res, next) => {

    const { authorization } = req.headers
    try {
        if (!authorization) throw new Error('Unauthorized Access......')
        
        const tokenSplit = authorization.split(" ")
        jwt.verify(tokenSplit[1], process.env.JWT_SECRET,
            async (err, decoded) => {
               
                if (err) {
                    
                    res.status(401).send({
                        status: false,
                        message: 'Unauthorized Acesss'
                            
                    })
                    return
                }
           
            const userData = await models.Users.findOne({ where: { email_address: decoded.email } })
            if (userData == null) throw new Error('Unauthorized Access')
           
            req.params.customerEmail = decoded.email
            req.params.user_id = userData.dataValues.user_id
            next()
        })
    } catch (error) {
        res.status(401).send({
            status: false,
            message: error.message || 'Unauthorized Acesss'
                
        })
        return
    }
   

}


module.exports = {
    authorization
}

