const express = require("express");
const router = express.Router();
const { checkAuth } = require("../config/utils");

const {
  registerDoctor,
  loginDoctor,
} = require("../controllers/doctor_controllers");

router.post("/register", checkAuth, registerDoctor);
router.post("/login", checkAuth, loginDoctor);

module.exports = router;
