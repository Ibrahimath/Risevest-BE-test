

const validateRegister = require('../Validations/validateregister');
const register = async(req,res) => {
    const validateData = validateRegister(req.body);
        if (validateData.error) {
            res.status(400)
           
            throw new Error({
                code: 400,
                message: validateData.error.details[0].message
            });
        }
        //check if the user already exists
        const user = await models.Users.findOne({
            where: {
                [Op.or]: [{ email_address: email }, { username }]
            }
        })
        if (user) {
          
            throw new Error({
                code: 400,
                message:'User already exists'
            });
        }
}

