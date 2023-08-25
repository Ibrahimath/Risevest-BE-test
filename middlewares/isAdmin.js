



const isAdmin = async (req, res, next) => {
    try{
    if(req.body.email.indexOf("@rise.com")=== -1)    {
        res.json({
            status: false,
            message: "Sorry, you are not allowed here"
        })
    }
    }catch(err){
        
    }
}