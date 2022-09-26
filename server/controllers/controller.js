const {sendEmail, createContact} = require("../utils/sib.js");

const contact = async (req, res) => {
  try {
    await sendEmail(req.body, parseInt(process.env.TEMPLATE_CONTACT), false);
    res.status(200).json({message : "thankYou for contacting us! we will reply you super soon"});
    
  } catch (error) { 
    console.log(error);
    res.status(500).json({message : "something went wrong! please try again later"}); 
  }
};

const comment = async (req, res) => {
  try {
    await sendEmail(req.body, parseInt(process.env.TEMPLATE_COMMENT), false);
    res.status(200).json({message : "thankYou for contacting us! we will reply you super soon"});
    
  } catch (error) { 
    res.status(500).json({message : "something went wrong! please try again later"}); 
  }
};

const subscribe = async (req, res) => {
  try {
    await createContact(req.body);
    res.status(200).json({message : "Confirmation mail is being sent to your email"});
    
  } catch (error) { 
    res.status(500).json({message : "something went wrong! please try again later"}); 
  }
};

module.exports = { contact, comment, subscribe};
