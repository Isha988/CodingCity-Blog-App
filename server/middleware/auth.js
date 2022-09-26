const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try{
        const token = req.headers?.authorization?.split(" ")[1];
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        next();
    }catch(error){
        res.status(401).json({message: "unauthorized requset"})
    }
}

module.exports = {authMiddleware}