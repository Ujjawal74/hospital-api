const express = require("express");
const router = express.Router();

const {registerPatient, createReport, allReports} = require("../controllers/patient_controllers");

router.post("/register", registerPatient);
router.post("/:id/create_report", createReport);
router.get("/:id/all_report", allReports);
module.exports = router;