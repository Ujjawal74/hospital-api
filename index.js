const express = require("express");
const cookieParser = require("cookie-parser"); // not-using
const path = require("path");
const app = express();
app.use(cookieParser()); // not using
const PORT = process.env.PORT || 8000;

// importing database connection && initiliaze middlewares!
const connectDB = require("./db/database");
connectDB();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("static"));

// import routers
const doctorRoutes = require("./routes/doctor_routes");
const patientRoutes = require("./routes/patient_routes");
// controller for patient status
const { filterStatus } = require("./controllers/patient_controllers");

app.get("/", (req, res) => {
  return res.status(200).send("Welcome to hospital api!");
});

// reports with filter
app.get("/reports/:status", filterStatus);
// doctor routes middleware
app.use("/doctors", doctorRoutes);
// patient routes middleware
app.use("/patients", patientRoutes);

app.listen(PORT, (err) => {
  if (err) {
    return console.log("Error in running the server");
  }
  console.log(`Server is listening at the port ${PORT}`);
});
