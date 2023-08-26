const isAdmin = (req, res, next) => {
  try {
    if (!req.body.email || req.body.email.indexOf("@rise.com") === -1) {
      res.json({
        status: false,
        message: "Sorry, you are not allowed here",
      });
      return
    }
    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  isAdmin
};