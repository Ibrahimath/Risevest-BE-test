//Function is to be imported and called at the 
//point of interacting with fil so as to log to the database.

const fileHistory = require("../models/loggerModel");

const logger = async (email, status, message) => {
  try {
    //validation
    if (!message || !status || !email) {
      throw new Error("supply all required info");
    }

    await fileHistory.create({
      email,
      message,
      status
    });

    return;
  } catch (error) {}
};

module.exports = logger;
