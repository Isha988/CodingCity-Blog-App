const Admin = require("../models/admin.js");
const jwt = require("jsonwebtoken");
const bcryt = require("bcryptjs");

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const admin = await Admin.findOne({ userName });

    if (!admin) return res.status(400).json({ message: "Invaid User Name" });

    const isPasswordMatched = await bcryt.compare(password, admin.password);
    if (!isPasswordMatched)
      return res.status(400).json({ message: "password don't matched" });

    const token = jwt.sign(
      { id: admin._id, userName: admin.userName },
      process.env.JWT_SECRET,
      { expiresIn: "15d" }
    );

    res.status(200).json({
      admin: admin.userName,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { login };
