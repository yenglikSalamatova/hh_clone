const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  getExperiences,
  createVacancy,
  getMyVacancies,
  getVacancyById,
  deleteVacancy,
  editVacancy,
  searchVacancies,
} = require("./controllers");
const { isManager } = require("../auth/middlewares");
const { validateVacancy, isAuthorOfVacancy } = require("./middlewares");

router.get("/api/experiences", getExperiences);

router.post(
  "/api/vacancy",
  passport.authenticate("jwt", { session: false }),
  isManager,
  validateVacancy,
  createVacancy
);

router.get(
  "/api/vacancy",
  passport.authenticate("jwt", { session: false }),
  isManager,
  getMyVacancies
);
router.get("/api/vacancy/search", searchVacancies);
router.get("/api/vacancy/:id", getVacancyById);
router.delete(
  "/api/vacancy/:id",
  passport.authenticate("jwt", { session: false }),
  isManager,
  isAuthorOfVacancy,
  deleteVacancy
);

router.put(
  "/api/vacancy/",
  passport.authenticate("jwt", { session: false }),
  isManager,
  isAuthorOfVacancy,
  validateVacancy,
  editVacancy
);
module.exports = router;
