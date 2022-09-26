const { check, validationResult } = require("express-validator");

const formValidationMiddleware = [
  check("name", "name can not be empty")
  .trim()
  .escape()
  .not()
  .isEmpty(),

  check("email", "Invalid Email address")
    .trim()
    .not()
    .isEmpty()
    .isEmail(),

  check("message", "message can not be empty")
    .trim()  
    .not()
    .isEmpty(),

   (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({message: errors.array()});
    next();
   } 
];

module.exports = {formValidationMiddleware};
