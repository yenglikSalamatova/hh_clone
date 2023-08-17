const Vacancy = require("./models/Vacancy");

const validateVacancy = (req, res, next) => {
  try {
    let errors = {};

    const { name, specializationId, cityId, description, employmentTypeId } =
      req.body;

    // Проверка обязательных полей
    if (!name) {
      errors.name = "Название вакансии обязательно для заполнения";
    }

    if (!specializationId || typeof specializationId !== "number") {
      errors.specializationId = "Специализация обязательна для заполнения";
    }

    if (!cityId || typeof cityId !== "number") {
      errors.cityId = "Город обязателен для заполнения";
    }

    if (!description) {
      errors.description = "Описание обязательно для заполнения";
    }

    if (!employmentTypeId) {
      errors.employmentTypeId = "Тип занятости обязателен для заполнения";
    }

    // Проверка наличия ошибок
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const isAuthorOfVacancy = async (req, res, next) => {
  try {
    const vacancy = await Vacancy.findByPk(req.params.id || req.body.id);
    if (!vacancy) {
      return res
        .status(400)
        .send({ message: "Vacancy with that id is not exist" });
    }
    if (vacancy.companyId === req.user.companyId) {
      return next();
    }
    return res.status(403).send({ message: "Access Forbidden" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { validateVacancy, isAuthorOfVacancy };
