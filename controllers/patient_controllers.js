const Patient = require("../models/patient");

const registerPatient = (req, res) => {
  req.body.doctor = "642bd117ecc82e2d9c5f0e0b";
  const patient = new Patient(req.body);
  patient
    .save()
    .then((t) => {
      res.status(200).json({ status: "registered patient!" });
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json({ status: "failed to register" });
    });
};

const createReport = async (req, res) => {
  try {
    const patient = await Patient.findOne({ _id: req.params.id });
    req.body.date = Date.now();
    patient.reports.push(req.body);
    patient
      .save()
      .then((t) => {
        res.json({ status: "report added!" });
      })
      .catch((e) => {
        console.log(e);
        res.status(500).json({ status: "unable to add report!" });
      });
  } catch (error) {
    console.log(error);
  }
};

const allReports = async (req, res) => {
  try {
    const patient = await Patient.findOne({ _id: req.params.id });
    res.json({ reports: patient.reports });
  } catch (error) {
    res.status(500).json({ status: "unable find reports!" });
    console.log(error);
  }
};

const filterStatus = async (req, res) => {
  try {
    const patients = await Patient.find({
      reports: {
        $elemMatch: {
          status: req.params.status,
        },
      },
    });
    res.json({ patients });
  } catch (error) {
    res.status(500).json({ status: "unable find reports!" });
    console.log(error);
  }
};

module.exports = { registerPatient, createReport, allReports, filterStatus };
