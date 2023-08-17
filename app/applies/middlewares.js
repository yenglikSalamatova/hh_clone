const Apply = require("./Apply");
const Resume = require("../resume/Resume");
const validateApply = async (req, res, next) => {
  try {
    let errors = {};

    if (!req.body.resumeId) errors.resumeId = "Поле резюме обязательно";
    if (!req.body.vacancyId) errors.resumeId = "Поле вакансия обязательна";
    if (errors.length > 0) {
      return res.status(400).send({ errors });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const isAuthorOfApply = async (req, res, next) => {
  try {
    const apply = await Apply.findByPk(req.params.id);

    if (!apply) return res.status(404).send({ message: "Apply not found" });

    const resume = await Resume.findByPk(apply.resumeId);

    if (resume.userId !== req.user.id)
      return res.status(404).send({ message: "Access Forbidden" });

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const isApplyExists = async (req, res, next) => {
  try {
    const apply = await Apply.findByPk(req.body.applyId);
    if (!apply) return res.status(404).send({ message: "Apply not found" });
    req.body.id = apply.vacancyId;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { validateApply, isAuthorOfApply, isApplyExists };
