const express = require("express");
const morgan = require("morgan");
const passport = require("passport");

require("dotenv").config({ path: "./config.env" });

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.use(passport.initialize());

//Passport
require("./app/auth/passport");

// Auth routes
app.use(require("./app/auth/routes"));

// Region routes
app.use(require("./app/region/routes"));

// Skills routes
app.use(require("./app/skills/routes"));

// EmploymentTypes routes
app.use(require("./app/employment-type/routes"));
app.use(require("./app/languages/routes"));

app.use(require("./app/resume/router"));

app.use(require("./app/specializations/routes"));

app.use(require("./app/vacancy/routes"));

app.use(require("./app/applies/routes"));

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
