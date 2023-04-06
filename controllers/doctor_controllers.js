const Doctor = require("../models/doctors");
const { hashPassword, compareHash, createToken } = require("../config/utils");

// doctor register controller
const registerDoctor = async (req, res) => {
  if (req.token && req.cred) {
    return res.status(200).json({ status: "you already logged in!" });
  }

  req.body.password = await hashPassword(req.body.password);
  const doctor = new Doctor(req.body);

  res.status(200).json({ status: "registered doctor!" });
  doctor
    .save()
    .then((data) => {
      const token = createToken({ id: data.id });
      // res.cookie("my_session", token, {
      //   expires: new Date(Date.now() + 300000),
      //   httpOnly: true,
      // });
      res.status(200).json({ status: "registered doctor!" });
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json({ status: "failed to register" });
    });
};

// doctor login controller
const loginDoctor = async (req, res) => {
  try {
    if (req.token && req.cred) {
      return res.status(200).json({ status: "you already logged in!" });
    }
    const name = req.body.name;
    const pass = req.body.password;
    const doctor = await Doctor.findOne({ name: name });
    if (doctor) {
      const isMatch = await compareHash(pass, doctor.password);
      if (isMatch) {
        const token = createToken({ id: doctor.id });
        // res.cookie("my_session", token, {
        //   expires: new Date(Date.now() + 300000),
        //   httpOnly: true,
        // });

        res.status(200).json({ status: "login success!", token: token });
      } else {
        res.status(401).json({ status: "either user/password is incorrect" });
      }
    } else {
      res.status(404).json({ status: "not found user!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

module.exports = { registerDoctor, loginDoctor };
