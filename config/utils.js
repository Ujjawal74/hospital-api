const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/doctors");
const MY_SECRET_KEY_SIGN = "1869e20c8ab88207a9a8d7b7f000d6a96b584c6c";

const hashPassword = async (password) => {
  const passHash = await bcrypt.hash(password, 10);
  return passHash;
};

const compareHash = async (pass, hash) => {
  const isMatch = await bcrypt.compare(pass, hash);
  return isMatch;
};

const createToken = (obj) => {
  const token = jwt.sign(obj, MY_SECRET_KEY_SIGN, {
    expiresIn: "120 seconds",
  });
  return token;
};

const verifyToken = (token) => {
  const obj = jwt.verify(token, MY_SECRET_KEY_SIGN);
  return obj;
};

const checkAuth = async (req, res, next) => {
  try {
    req.token = undefined;
    req.cred = undefined;

    const token = req.cookies.my_session;
    if (!token) {
      next();
      return;
    }
    req.token = token;
    const obj = verifyToken(token, MY_SECRET_KEY_SIGN);
    if (obj) {
      const doctor = await Doctor.findOne({ _id: obj.id });
      if (doctor) {
        req.cred = doctor;
        next();
      } else {
        next();
      }
    }
  } catch (error) {
    next();
    return;
  }
};

module.exports = {
  hashPassword,
  compareHash,
  createToken,
  verifyToken,
  checkAuth,
};
